import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { VideoCard } from "../Cards/VideoCard";
import { PostCard } from "../Cards/PostCard";
import { ArticleCard } from "../Cards/ArticleCard";
import { getPosts } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useArticles } from "@/lib/queries";

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

  const { data: articles = [] } = useArticles();
  // const { data: articles = [], isLoading: articlesLoading } = useArticles();

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
        });
        // );

        setPosts(formattedPosts);
      } catch (error) {
        console.log("Error while fetching post", error);
      }
    };

    fetchPost();
  }, [address]);

  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <Tabs defaultValue="for-you" className="space-y-8 w-full flex flex-col items-center">
        <TabsList className="grid w-full width rounded-[0.4rem] grid-cols-3 bg-[#222222] max-xl:ml-10 ">
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

        <TabsContent value="for-you" className="space-y-4 w-full">
          {posts.slice(0, 1).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}

          {articles.slice(0, 1).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}

          {/* <PostCard key={posts[0].id} content={posts[0].content} username={posts[0].username} likes={posts[0].likes} comments={posts[0].comments} featured /> */}
          <div className="w-full grid place-items-center">
            <div className="flex gap-10 w-[80%]">
              <VideoCard isGated={false} />
              <VideoCard isGated={true} />
            </div>
            <hr className="border mt-10 mb-10 w-full" />
          </div>

          {posts.slice(1, 2).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}

          <div className="w-full grid place-items-center">
            <div className="flex gap-10 w-[80%]">
              <VideoCard isGated={false} />
              <VideoCard isGated={true} />
            </div>
            <hr className="border mt-10 mb-10 w-full" />
          </div>

          {articles.slice(1, 2).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}

          {/* <ArticleCard isGated={true} /> */}

          {posts.slice(3, 4).map((post) => (
            <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />
          ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          {/* <PostCard featured /> */}
          {articles.slice(0, 1).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
          {/* <ArticleCard isGated={false} /> */}
          {/* <PostCard /> */}
          <VideoCard isGated={false} />
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <VideoCard isGated={false} />
          {/* <PostCard featured /> */}
          {articles.slice(0, 1).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
          {/* <PostCard /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeFeeds;
