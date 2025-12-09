// src/components/Cards/ArticleCard.tsx
"use client";

import { Heart, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  preview?: string;
  username: string;
  author: string;
  createdAt?: string | number;
  coverImage?: string;
  isGated?: boolean;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

  // Extract readable time
  const timeAgo = () => {
    const now = Date.now();
    const diff = now - new Date(article.createdAt).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  // Estimate reading time (words per minute ≈ 200)
  const readingTime = Math.max(1, Math.ceil(article.preview.split(" ").length / 200));

  return (
    <div className="h-[350px] grid place-items-center">
      <div className="width-article flex gap-6 h-full w-full overflow-hidden border-border rounded-lg p-4 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer group">
        {/* Cover Image Placeholder */}
        {/* <div className="hidden sm:block w-[30%] bg-secondary/50 rounded-lg overflow-hidden shrink-0 border border-border/50">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No cover</div>
        </div> */}

        {article.coverImage && (
          <div onClick={() => navigate(`/article/${article.id}`)} className="hidden sm:block w-[40%] rounded-lg overflow-hidden shrink-0 border border-border/50">
            <img src={article.coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
        )}

        {/* <div className="hidden sm:block w-[40%] rounded-lg overflow-hidden shrink-0 border border-border/50">
          {
            article.coverImage && <img src={article.coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            // : (
            //   <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-muted-foreground text-xs">No cover</div>
            // )
          }
        </div> */}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2" onClick={() => navigate(`/article/${article.id}`)}>
            <div className="flex-1">
              <h3 className="font-bold text-4xl line-clamp-2 group-hover:text-primary transition">{article.title || "Untitled Article"}</h3>
            </div>
            {article.isGated && <Lock className="w-4 h-4 text-accent shrink-0 mt-1" />}
          </div>

          <p onClick={() => navigate(`/article/${article.id}`)} className="text-[18px] text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{article.preview || "No preview available..."}</p>

          <div className="flex items-center justify-between">
            <a href={`/profile/${article.username}`}>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://github.com/${article.username}.png`} />
                <AvatarFallback className="text-xs">{article.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">@{article.username}</p>
                <p className="text-xs text-muted-foreground">
                  {readingTime} min read • {timeAgo()}
                </p>
              </div>
            </div>
            </a>
            <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500 transition group-hover:scale-110" />
          </div>
        </div>
      </div>
      <hr className="border mt-10 w-full" />
    </div>
  );
}
