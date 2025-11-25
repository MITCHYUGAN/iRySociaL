import { ArticleCard } from "@/components/Cards/ArticleCard";
import { PostCard } from "@/components/Cards/PostCard";
import { VideoCard } from "@/components/Cards/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfileByUsername } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  // MapPin,
  // LinkIcon,
  Calendar,
  SquarePen,
} from "lucide-react";
import { useParams } from "react-router-dom";
// import { Spinner } from "@/components/ui/spinner";

const Profile = () => {
  const { address } = useAccount();
  const [owner, setOwner] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileJoined, setProfileJoined] = useState(Date);
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);

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
    };

    fetchProfileByUsername();
  }, [address, username]);

  return (
    <>
      {loading ? (
        <div className="grid place-items-center w-full h-screen">
          <div className="flex flex-col items-center gap-[10px]">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent mb-4"></div>
            <h1>Loading profile...</h1>
          </div>
        </div>
      ) : !profile ? (
        <h1>Profile not found</h1>
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-[#0e0e0e] rounded-lg">
              {/* <div className="text-center">
            <p className="text-xl font-bold">2.3M</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </div> */}

              <div className="text-center">
                <p className="text-xl font-bold">3</p>
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
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-border last:border-b-0">
                    <PostCard />
                  </div>
                ))}
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
