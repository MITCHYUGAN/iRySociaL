import { useEffect, useState } from "react";
import { PostCard } from "../Cards/PostCard";
import { getPosts } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { useAccount } from "wagmi";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  content: string;
  username: string;
  likes: number;
  comments: number;
}

const PostFeed = () => {
  const { address } = useAccount();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts();
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

    fetchPost();
  }, [address]);

  return (
    <section className="flex flex-col gap-7 mt-10">
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
              <Button className="cursor-pointer" onClick={() => navigate("/create/post")}>Create Post</Button>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        posts.map((post) => <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments} />)
      )}
    </section>
  );
};

export default PostFeed;
