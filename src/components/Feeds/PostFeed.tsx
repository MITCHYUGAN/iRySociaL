import { useEffect, useState } from "react";
import { PostCard } from "../Cards/PostCard";
import { getPosts } from "@/features/CreatePost/grapghqLQuery/queryposts";
import { useAccount } from "wagmi";
import DOMPurify from "dompurify";

const PostFeed = () => {
  const { address } = useAccount();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState();

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchPost = async () => {
      const fetchedPosts = await getPosts();

      fetchedPosts.map((post) => {
        console.log("eachPost", post);
        setPosts([post]);
      });

      setPosts(fetchedPosts);

      console.log("User Post", fetchedPosts);
    };

    fetchPost();
  }, [address]);

  return (
    <section className="flex flex-col gap-7 mt-10">
      {posts.map((post) => (
        <PostCard content={post.content} />
      ))}
      {/* 
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard /> */}
    </section>
  );
};

export default PostFeed;
