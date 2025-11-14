"use client";

import { Play, Heart, MessageCircle, Share2, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
  isGated?: boolean;
}

export function VideoCard({ isGated = false }: VideoCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1667126444822-94fb21279436?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHZpZXd8ZW58MHx8MHx8fDA%3D"
          alt="Video"
          className="w-full object-cover group-hover:scale-105 transition-transform"
        />
        {isGated && (
          <div className="absolute top-2 right-2 bg-accent/80 backdrop-blur text-accent-foreground px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Gated
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-accent/80 backdrop-blur p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
            <Play className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold truncate">Amazing Video Title Here</h3>
            <p className="text-sm text-muted-foreground">Creator Name • 1.2M views</p>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex gap-4 text-muted-foreground text-sm">
          <button className="flex items-center gap-1 hover:text-accent transition">
            <Heart className="w-4 h-4" />
            <span>234</span>
          </button>
          <button className="flex items-center gap-1 hover:text-accent transition">
            <MessageCircle className="w-4 h-4" />
            <span>45</span>
          </button>
          <button className="flex items-center gap-1 hover:text-accent transition">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
