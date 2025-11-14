import VideoFeed from "@/components/Feeds/VideoFeed";

const Videos = () => {
  return (
    <div className="w-full pt-5 lg:py-10 px-5">
      <div className="flex gap-4 flex-col">
        <h1 className="text-4xl font-semibold">Videos</h1>
        <p className="text-1xl">Discover amazing video content from creators</p>
      </div>
      <VideoFeed />
    </div>
  );
};

export default Videos;
