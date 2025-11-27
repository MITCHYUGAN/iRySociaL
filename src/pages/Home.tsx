import HomeFeeds from "@/components/Feeds/HomeFeed";
import CreatePostForm from "@/features/CreatePost/CreatePostForm";

const Home = () => {

  return (
    <div className="w-full flex flex-col items-center ">
      <CreatePostForm />
      <hr className="border mt-10 w-full" />
      <HomeFeeds />
    </div>
  );
};

export default Home;
