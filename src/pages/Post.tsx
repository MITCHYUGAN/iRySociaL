import PostFeed from "@/components/Feeds/PostFeed";
import { MessageSquare } from "lucide-react";

const Posts = () => {
  return (
    <div className="w-full flex flex-col items-center pt-5 ">
      <div className="flex gap-4 width mb-10 w-full flex-col">
        <div className="flex w-full items-center gap-3">
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
