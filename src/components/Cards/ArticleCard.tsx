"use client"

import { Heart, Lock, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArticleCardProps {
  isGated?: boolean
}

export function ArticleCard({ isGated = false }: ArticleCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer group">
      <div className="flex gap-6">
        {/* Article Image */}
        <div className="hidden sm:block w-[30%] bg-secondary rounded-lg overflow-hidden shrink-0">
          <img
            src="https://thumbs.dreamstime.com/b/baltic-see-very-nice-pic-klaip%C4%97da-176842928.jpg"
            alt="Article"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-3xl line-clamp-2 group-hover:text-primary transition">
                The Future of Web Development
              </h3>
            </div>
            {isGated && <Lock className="w-4 h-4 text-accent shrink-0 mt-1" />}
          </div>

          <p className="text-[20px] text-muted-foreground line-clamp-2 mb-3">
            Exploring the latest trends and technologies shaping the future of web development...
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-semibold">Jane Doe</p>
                <p className="text-muted-foreground">5 min read</p>
              </div>
            </div>
            <Heart className="w-4 h-4 text-muted-foreground hover:text-accent transition cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}
