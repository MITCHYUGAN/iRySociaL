import ArticleFeed from "@/components/Feeds/ArticleFeed";
import { Newspaper } from "lucide-react";

const Articles = () => {
  return (
    <div className="w-full flex flex-col items-center pt-5 ">
      <div className="flex gap-4 width-article mb-10 w-full flex-col">
        <div className="flex w-full items-center gap-3">
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
