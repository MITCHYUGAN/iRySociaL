import { VideoCard } from "../Cards/VideoCard"

const VideoFeed = () => {
  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
    </section>
  )
}

export default VideoFeed