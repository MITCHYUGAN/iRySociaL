import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { VideoCard } from "../Cards/VideoCard";
import { PostCard } from "../Cards/PostCard";
import { ArticleCard } from "../Cards/ArticleCard";
import { getPosts } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

interface Tag {
  name: string;
  value: string;
}

interface RawPost {
  id: string;
  content: string;
  tags: Tag[];
}

interface Post {
  id: string;
  content: string;
  username: string;
  likes: number;
  comments: number;
}

const tabSTyle = "rounded-[0.4rem] p-1.5 cursor-pointer focus:bg-black active:bg-black";

const HomeFeeds = () => {
  // Fetching Posts =============
  const { address } = useAccount();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPosts: RawPost[] = await getPosts();
        // const formattedPosts: Post[] = await Promise.all(
          const formattedPosts: Post[] = fetchedPosts.map((post) => {
            const author = post.tags.find((t) => t.name === "author")?.value || "Anonymous";
            const profile = post.tags.find((t) => t.name === "username")?.value || "Anonymous";
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
        // );

        setPosts(formattedPosts);
      } catch (error) {
        console.log("Error while fetching post", error);
      }
    };

    fetchPost();
  }, [address]);

  return (
    <div className="mt-10 w-full">
      <Tabs defaultValue="for-you" className="space-y-8">
        <TabsList className="grid w-full p-1 rounded-[0.4rem] grid-cols-3 bg-[#222222]">
          <TabsTrigger value="for-you" className="rounded-[0.4rem] p-1.5 cursor-pointer hover:bg-black focus:bg-black active:bg-black">
            For You
          </TabsTrigger>
          <TabsTrigger disabled value="following" className={tabSTyle}>
            Following
          </TabsTrigger>
          <TabsTrigger disabled value="trending" className={tabSTyle}>
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="space-y-4">
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}
          {/* <PostCard key={posts[0].id} content={posts[0].content} username={posts[0].username} likes={posts[0].likes} comments={posts[0].comments} featured /> */}
          <VideoCard isGated={false} />
          {posts.slice(2, 3).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}
          <VideoCard isGated={true} />
          <ArticleCard isGated={true} />
          {posts.slice(3, 4).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          {/* <PostCard featured /> */}
          <ArticleCard isGated={false} />
          {/* <PostCard /> */}
          <VideoCard isGated={false} />
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <VideoCard isGated={false} />
          {/* <PostCard featured /> */}
          <ArticleCard isGated={false} />
          {/* <PostCard /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeFeeds;
