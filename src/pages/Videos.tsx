import VideoFeed from "@/components/Feeds/VideoFeed";
import { Video } from "lucide-react";

const Videos = () => {
  return (
    <div className="w-full pt-5 lg:py-10 px-5">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-3">
          <Video className="text-primary" />
          <h1 className="text-[40px] font-semibold">Videos</h1>
        </div>
        <p className="text-[20px]">Discover amazing video content from creators</p>
      </div>
      <VideoFeed />
    </div>
  );
};

export default Videos;
