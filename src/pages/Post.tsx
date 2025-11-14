import PostFeed from "@/components/Feeds/PostFeed";
import { MessageSquare } from "lucide-react";

const Posts = () => {
  return (
    <div className="w-full pt-5 lg:py-10 px-5">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-primary" />
          <h1 className="text-[40px] font-semibold">Posts</h1>
        </div>
        <p className="text-[20px]">Join the conversation with the community</p>
      </div>
      <PostFeed />
    </div>
  );
};

export default Posts;
