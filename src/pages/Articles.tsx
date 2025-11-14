import ArticleFeed from "@/components/Feeds/ArticleFeed";

const Articles = () => {
  return (
    <div className="w-full pt-5 lg:py-10 px-5">
      <div className="flex gap-4 flex-col">
        <h1 className="text-[40px] font-semibold">Articles</h1>
        <p className="text-[20px]">Read insightful articles from top writers</p>
      </div>
      <ArticleFeed />
    </div>
  );
};

export default Articles;
