import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { VideoCard } from "../Cards/VideoCard";
import { PostCard } from "../Cards/PostCard";
import { ArticleCard } from "../Cards/ArticleCard";

const tabSTyle = "rounded-[0.4rem] p-1.5 cursor-pointer hover:bg-black focus:bg-black active:bg-black";

const HomeFeeds = () => {
  return (
    <div className="mt-10">
      <Tabs defaultValue="for-you" className="space-y-4">
        <TabsList className="grid w-full p-2.5 rounded-[0.4rem] grid-cols-3 bg-[#222222]">
          <TabsTrigger value="for-you" className="rounded-[0.4rem] p-1.5 cursor-pointer hover:bg-black focus:bg-black active:bg-black">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className={tabSTyle}>
            Following
          </TabsTrigger>
          <TabsTrigger value="trending" className={tabSTyle}>
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="space-y-4">
          <PostCard featured />
          <VideoCard isGated={false} />
          <PostCard />
          <ArticleCard isGated={true} />
          <PostCard />
          <VideoCard isGated={true} />
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <PostCard featured />
          <ArticleCard isGated={false} />
          <PostCard />
          <VideoCard isGated={false} />
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
            <VideoCard isGated={false} />
            <PostCard featured />
            <ArticleCard isGated={false} />
            <PostCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeFeeds;
