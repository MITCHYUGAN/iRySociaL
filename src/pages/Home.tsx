import HomeFeeds from "@/components/Feeds/HomeFeeds";
import CreatePostForm from "@/features/PostCreation/CreatePostForm";

const Home = () => {

  return (
    <div className=" pt-5 px-5 md:px-10 lg:px-20 lg:py-10 w-full">
      <CreatePostForm />
      <HomeFeeds />
    </div>
  );
};

export default Home;
