import { ArticleCard } from "../Cards/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useArticles } from "@/lib/queries";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { MessageSquare } from "lucide-react";

export default function ArticleFeed() {
  const { data: articles = [], isLoading } = useArticles();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return (
  //     <div className="space-y-8 mt-10">
  //       {[...Array(4)].map((_, i) => (
  //         <Skeleton key={i} className="h-48 w-full rounded-xl" />
  //       ))}
  //     </div>
  //   );
  // }

  // if (articles.length === 0) {
  //   return (
  //     <div className="text-center py-20">
  //       <h3 className="text-3xl font-bold mb-4">No articles yet</h3>
  //       <p className="text-muted-foreground mb-8">Be the first to publish one!</p>
  //       <Button size="lg" onClick={() => navigate("/create/article")}>
  //         Write Article
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <section className="">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      {isLoading ? (
        // <div className="space-y-8 mt-10">
        //   {[...Array(4)].map((_, i) => (
        //     <Skeleton key={i} className="h-48 w-full rounded-xl" />
        //   ))}
        // </div>
        <div className="grid place-items-center w-full h-screen">
          <div className="flex flex-col items-center gap-[10px]">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent mb-4"></div>
            <h1>Fetching Articles...</h1>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare />
            </EmptyMedia>
            <EmptyTitle>No Post Found</EmptyTitle>
            <EmptyDescription>We couldn't find any post yet. Get started by creating your first post.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button className="cursor-pointer" onClick={() => navigate("/create/post")}>
                Create Post
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        articles.map((article) => <ArticleCard key={article.id} article={article} />)
      )}
    </section>
  );
}
