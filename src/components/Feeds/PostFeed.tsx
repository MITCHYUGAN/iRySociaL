import { useEffect, useState } from "react";
import { PostCard } from "../Cards/PostCard";
import { getPosts } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { useAccount } from "wagmi";

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
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

        setPosts(formattedPosts);
      } catch (error) {
        console.log("Error while fetching post", error)
      }
    };

    fetchPost();
  }, [address]);

  return (
    <section className="flex flex-col gap-7 mt-10">
      {posts.map((post) => (
        <PostCard key={post.id} content={post.content} username={post.username} likes={post.likes} comments={post.comments}  />
      ))}
    </section>
  );
};

export default PostFeed;
