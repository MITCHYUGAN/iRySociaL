import ArticleFeed from "@/components/Feeds/ArticleFeed";
import { Newspaper } from "lucide-react";

const Articles = () => {
  return (
    <div className="pt-5 lg:py-10 px-5">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-3">
          <Newspaper className="text-primary" />
          <h1 className="text-[40px] font-semibold">Articles</h1>
        </div>
        <p className="text-[20px]">Read insightful articles from top writers</p>
      </div>
      <ArticleFeed />
    </div>
  );
};

export default Articles;
