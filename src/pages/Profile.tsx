import { ArticleCard } from "@/components/Cards/ArticleCard";
import { PostCard } from "@/components/Cards/PostCard";
import { VideoCard } from "@/components/Cards/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfile } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";
import { useEffect } from "react";
import { useAccount } from "wagmi";
// import { MapPin, LinkIcon, Calendar } from "lucide-react";

const Profile = () => {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchProfile = async () => {
      const profile = getProfile(address);
      console.log("profile", profile);
    };

    fetchProfile();
  });

  return (
    <div className="w-full pt-5 lg:py-10 px-5 flex-1">
      <div className="h-48 bg-linear-to-r from-accent/20 to-primary/20 rounded-lg mx-4 mt-4"></div>

      <div className="px-4 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-24 mb-6 relative z-10">
          <Avatar className="h-32 w-32 border-4 border-card">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>🥷</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Creator Profile</h1>
            <p className="text-muted-foreground">@creatorhandle</p>
            {/* <Badge className="mt-2">Verified</Badge> */}
          </div>
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
        </div>

        {/* Bio */}
        <div className="space-y-3 mb-6">
          <p className="text-foreground">Creating amazing content about technology, web development, and the digital future. Join 2.3M+ creators.</p>
          {/* <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-accent hover:underline">
                creatorsite.com
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined Aug 2022
            </div>
          </div> */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-[#0e0e0e] rounded-lg">
          {/* <div className="text-center">
            <p className="text-xl font-bold">2.3M</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </div> */}
          <div className="text-center">
            <p className="text-xl font-bold">543</p>
            <p className="text-xs text-muted-foreground">Videos</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">128</p>
            <p className="text-xs text-muted-foreground">Articles</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">5.2K</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="videos" className="flex-1">
              Videos
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex-1">
              Articles
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex-1">
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <VideoCard key={i} isGated={i % 2 === 0} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <ArticleCard key={i} isGated={i % 2 === 0} />
            ))}
          </TabsContent>

          <TabsContent value="posts" className="mt-6 space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border last:border-b-0">
                <PostCard />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
