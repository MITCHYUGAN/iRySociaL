import CreatePostForm from "@/features/PostCreation/CreatePostForm";

const Home = () => {

  return (
    <div className="pt-5 pr-5 md:px-20 md:py-10 w-full">
      <CreatePostForm />
      <section aria-label="mainfeed filters">
        <div>
          <h2>For you</h2>
        </div>
        <div>
          <h2>Following</h2>
        </div>
        <div>
          <h2>Trending</h2>
        </div>
      </section>
      <section aria-label="mainfeed feeds">
        <div></div>
      </section>
    </div>
  );
};

export default Home;
