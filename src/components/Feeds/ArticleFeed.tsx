// src/components/Feeds/ArticleFeed.tsx
"use client";

import { ArticleCard } from "../Cards/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useArticles } from "@/lib/queries";

export default function ArticleFeed() {
  const { data: articles = [], isLoading } = useArticles();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-8 mt-10">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-3xl font-bold mb-4">No articles yet</h3>
        <p className="text-muted-foreground mb-8">Be the first to publish one!</p>
        <Button size="lg" onClick={() => navigate("/create/article")}>
          Write Article
        </Button>
      </div>
    );
  }

  return (
    <section className="mt-10 space-y-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}