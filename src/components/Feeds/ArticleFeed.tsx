// src/components/Feeds/ArticleFeed.tsx

import { useEffect, useState } from "react";
import { getArticles } from "@/features/CreateArticle/grapghqLQuery/queryarticle";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ArticleFeed() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-12 mt-10">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-3xl font-bold mb-4">No articles yet</h3>
        <p className="text-muted-foreground mb-8">Be the first to write one!</p>
        <Button size="lg" onClick={() => navigate("/create/article")}>
          Write Your First Article
        </Button>
      </div>
    );
  }

  return (
    <section className="mt-10 space-y-16">
      {articles.map((article) => (
        <ArticleViewer key={article.id} article={article} />
      ))}
    </section>
  );
}

// CHANGE: Safe per-article viewer
function ArticleViewer({ article }: { article: any }) {
  const editor = useCreateBlockNote({
    initialContent: article.blocks || [{ type: "paragraph", content: "Empty article" }],
  });

  return (
    <article className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all">
      <div className="p-8 md:p-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 mb-8 text-muted-foreground">
          <span className="font-medium">by @{article.username}</span>
          <span>•</span>
          <span>{new Date(article.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <BlockNoteView editor={editor} editable={false} theme="dark" />
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-sm text-muted-foreground">
          Published on Irys • Permanent & Decentralized
        </div>
      </div>
    </article>
  );
}