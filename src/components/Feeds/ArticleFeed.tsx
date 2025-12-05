import { useEffect, useState } from "react";
import { ArticleCard } from "../Cards/ArticleCard"
import { getArticles } from "@/features/CreateArticle/grapghqLQuery/queryarticle";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ArticleFeed = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const showARticles = () => {
    
    console.log("Articles", articles)
  }

  if (loading) {
    return (
      <div className="space-y-8 mt-10">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold mb-4">No articles yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to write one!</p>
        <Button onClick={() => navigate("/create/article")}>
          Write Article
        </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-7 mt-10">
        <button onClick={showARticles}>SHow articles</button>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
    </section>
  )
}

export default ArticleFeed