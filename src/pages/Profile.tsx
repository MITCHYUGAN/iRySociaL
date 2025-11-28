import { ArticleCard } from "@/components/Cards/ArticleCard";
// import { PostCard } from "@/components/Cards/PostCard";
import { VideoCard } from "@/components/Cards/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfileByUsername } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  // MapPin,
  // LinkIcon,
  Calendar,
  Loader2,
  MessageSquare,
  RotateCw,
  SquarePen,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserPost } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { PostCard } from "@/components/Cards/PostCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getIrysUploader } from "@/lib/irys";
import { ethers, type AddressLike } from "ethers";
import { Input } from "@/components/ui/input";
// import { Spinner } from "@/components/ui/spinner";

interface Post {
  id: string;
  content: string;
  username: string;
  likes: number;
  comments: number;
}

const Profile = () => {
  const { address } = useAccount();
  const [owner, setOwner] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileJoined, setProfileJoined] = useState(Date);
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const [uploadBalance, setUploadBalance] = useState("Not found");
  const [walletBalance, setWalletBalance] = useState("Not Found");
  const [walletName, setWalletName] = useState("Not found");
  const [amountToFund, setAmountToFUnd] = useState("0.001");

  // Fetch user balance
  const fetchUploadBalance = async () => {
    const irys = await getIrysUploader();

    setLoading(true);

    try {
      // console.log("Getting upload balance...");
      const balanceAtomic = await irys.getBalance();
      const balance = irys.utils.fromAtomic(balanceAtomic).toString();
      // console.log("Balance", balance);
      setUploadBalance(balance);
    } catch (error) {
      console.log("Error getting Upload Balance", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletInfo = async () => {
    // console.log("Fetching wallet Balance...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Fetch balance
      const walletBalance = await provider.getBalance(address as AddressLike);
      const walletBalanceEth = ethers.formatEther(walletBalance);

      // Fetch name
      const walletName = (await provider.getNetwork()).name;

      setWalletBalance(walletBalanceEth);
      setWalletName(walletName);

      return walletBalanceEth;
    } catch (error) {
      console.log("Error while fetching Wallet balance", error);
      return "Not found";
    }
  };

  // Fund account
  const fundAccount = async (amount: string) => {
    console.log("Funding...", amount);
    setLoading(true);

    if (!amount || Number(amount) <= 0) {
      alert("Pls enter a valid amount");
      return;
    }

    try {
      // Compare wallet balance with amount to fund
      const walletBalance = await fetchWalletInfo();

      if (Number(walletBalance) < Number(amount)) {
        alert("Not enough balance");
        return;
      }

      try {
        const irys = await getIrysUploader();

        setLoading(true);
        console.log("funding...");
        const fundTx = await irys.fund(irys.utils.toAtomic(amount));
        console.log(`Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${irys.token}`);
        alert("Funded Successfully");
        // setLoading(false);
        setAmountToFUnd("");
      } catch (error: unknown) {
        console.log("Error while funding", error);

        // if (error.message.includes("user rejected action")) {
        //   alert("User Rejected transaction");
        // }

        if (error instanceof Error && error.message.includes("user rejected action")) {
          alert("User Rejected transaction");
        } else {
          console.error("Error while funding", error);
        }
      }

      console.log("result", walletBalance);
    } catch (error) {
      console.log("Error when funding...", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchProfileByUsername = async () => {
      setLoading(true);
      const cleanedUsername = username?.replace(/^@/, "") || "";

      const profile = await getProfileByUsername(cleanedUsername);

      if (profile) {
        setProfile(profile);
        setProfileUsername(profile.username);
        setProfileBio(profile.bio);

        const date = new Date(profile.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        setProfileJoined(date);

        if (profile.author === address) {
          setOwner(true);
        }
      }

      setLoading(false);
      return profile
    };

    const fetchUserPost = async () => {
      try {
        setLoading(true);

        const profile = await fetchProfileByUsername()
        console.log("Profileffff", profile)

        const fetchedPosts = await getUserPost(profile.username);
        const formattedPosts: Post[] = await Promise.all(
          fetchedPosts.map(async (post: any) => {
            const author = post.tags.find((t: any) => t.name === "author")?.value || "Anonymous";
            const profile = post.tags.find((t: any) => t.name === "username")?.value || "Anonymous";
            // const plainText = post.content;
            return {
              id: post.id,
              content: post.content,
              author: author.slice(0, 6) + "..." + author.slice(-4),
              // createdAt: post.timestamp,
              likes: 0,
              comments: 0,
              // readTime: `${Math.ceil(
              //   plainText.split(" ").length / 200
              // )} min read`,
              username: profile,
            };
          })
        );
        setLoading(false);
        setPosts(formattedPosts);
      } catch (error) {
        console.log("Error while fetching post", error);
      }
    };

    fetchProfileByUsername();
    fetchUserPost();
    fetchUploadBalance();
    fetchWalletInfo();
  }, [address, username]);

  return (
    <>
      {loading ? (
        <div className="grid place-items-center w-full h-screen">
          <div className="flex flex-col items-center gap-[10px]">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent mb-4"></div>
            <h1>Fetching profile...</h1>
          </div>
        </div>
      ) : !profile ? (
        <div className="grid place-items-center w-full h-screen">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquare />
              </EmptyMedia>
              <EmptyTitle>No Profile Found</EmptyTitle>
              <EmptyDescription>
                We couldn't find your profile. <br /> If you're sure this exists, pls try again.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <div className="w-full pt-5 lg:py-10 px-5 flex-1 max-w-[1200px] ">
          <div className="h-48 bg-linear-to-r from-accent/20 to-primary/20 rounded-lg mx-4 mt-4"></div>
          <div className="px-4 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-24 mb-6 relative z-10">
              <Avatar className="h-32 w-32 border-4 border-card">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>🥷</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-4xl font-bold">{profileUsername}</h1>
                <p className="text-muted-foreground text-[20px]">@{profileUsername}</p>
                {/* <Badge className="mt-2">Verified</Badge> */}
              </div>

              {!owner ? (
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                  // onClick={() => setIsFollowing(!isFollowing)}
                  // variant={isFollowing ? "outline" : "default"}
                  // className={
                  //   isFollowing ? "" : "bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
                  // }
                  >
                    {/* {isFollowing ? "Following" : "Follow"} */}
                    Follow
                  </Button>
                  <Button
                  // onClick={() => setIsSubscribed(!isSubscribed)}
                  // className={`${isSubscribed ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90"} w-full sm:w-auto`}
                  >
                    {/* {isSubscribed ? "Subscribed" : "Subscribe"} */}
                    Subscribe
                  </Button>
                </div>
              ) : (
                <div>
                  <Button className="cursor-pointer">
                    <SquarePen />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-3 mb-6">
              <p className="text-foreground text-2xl">{profileBio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {/* <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-accent hover:underline">
                creatorsite.com
              </a>
            </div> */}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profileJoined}
                </div>
              </div>
            </div>

            {/* Wallet */}
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;
                return (
                  <div className="w-full flex flex-col items-center gap-6">
                    {connected && (
                      <>

                        {/* Button to show network */}
                        <button
                          onClick={openChainModal}
                          className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-main/50 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            {chain.hasIcon && chain.iconUrl && <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl || "/placeholder.svg"} className="w-6 h-6" />}
                            <span className="text-white font-medium font-display-inter">{chain.name}</span>
                          </div>
                          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="text-gray-400">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            {/* Funding account and getting balance */}
            <div className="flex flex-col gap-5 max-w-[300px] w-[80%] md:m-10 mb-5 mt-5 justify-between text-white">
              <h1 className="">
                Upload balance: <span className="text-[10px] text-[#51ffd6] italic">{uploadBalance}</span>
              </h1>

              <div className="flex justify-between items-center">
                <Button disabled={loading} onClick={fetchUploadBalance} variant="default">
                  Refresh
                  <RotateCw className="cursor-pointer w-[15px]" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Fund</Button>
                  </DialogTrigger>
                  <DialogContent className="border-0  text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Fund your Account</DialogTitle>
                      <DialogDescription className="text-gray-400">Fund your upload account with custom testnet tokens</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5  py-2">
                      <div className="space-y-5  py-2">
                        <div className="flex flex-col text-white">
                          <h1>
                            Current balance: <span className="text-[10px] text-[#51ffd6] italic">{walletBalance}</span>
                          </h1>
                          <h1>Current Network: {walletName}</h1>
                        </div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <Input value={amountToFund} onChange={(e) => setAmountToFUnd(e.target.value)} className="bg-gray-900 border-gray-700 text-white" placeholder="0.0001" />
                      </div>
                      <div className="flex justify-between gap-3">
                        <Button onClick={() => fundAccount(amountToFund)} disabled={loading} className="bg-primary text-black cursor-pointer">
                          {loading ? (
                            <>
                              Funding
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            </>
                          ) : (
                            "Fund"
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-[#0e0e0e] rounded-lg">
              {/* <div className="text-center">
            <p className="text-xl font-bold">2.3M</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </div> */}

              <div className="text-center">
                <p className="text-xl font-bold">{posts.length}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="posts" className="flex-1">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex-1">
                  Articles
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex-1">
                  Videos
                </TabsTrigger>
                {/* <TabsTrigger value="videos" className="flex-1">
              Likes
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">
              Bookmarks
            </TabsTrigger> */}
              </TabsList>

              <TabsContent value="posts" className="mt-6 space-y-0">
                {loading ? (
                  <div className="grid place-items-center w-full h-screen">
                    <div className="flex flex-col items-center gap-[10px]">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent mb-4"></div>
                      <h1>Fetching Posts...</h1>
                    </div>
                  </div>
                ) : posts.length === 0 ? (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <MessageSquare />
                      </EmptyMedia>
                      <EmptyTitle>No Post Found</EmptyTitle>
                      <EmptyDescription>We couldn't find any post yet. Get started by creating your first post.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <div className="flex gap-2">
                        <Button className="cursor-pointer" onClick={() => navigate("/create/post")}>
                          Create Post
                        </Button>
                      </div>
                    </EmptyContent>
                  </Empty>
                ) : (
                  posts.map((post) => <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />)
                )}
              </TabsContent>

              <TabsContent value="articles" className="mt-6 space-y-4">
                {[1, 2].map((i) => (
                  <ArticleCard key={i} isGated={i % 2 === 0} />
                ))}
              </TabsContent>

              <TabsContent value="videos" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1].map((i) => (
                    <VideoCard key={i} isGated={i % 2 === 0} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
