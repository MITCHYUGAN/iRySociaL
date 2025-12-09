"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  // MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccount } from "wagmi";
import DOMPurify from "dompurify";

interface PostCardProps {
  featured?: boolean;
  content: string;
  username: string;
  likes: number;
  comments: number;
}

export function PostCard({ featured = false, content, username, likes, comments }: PostCardProps) {
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center w-full">
      <div className={`width w-full border-none rounded-lg hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer group ${featured ? "ring-2 ring-accent/30" : ""}`}>
        <div className="flex w-full items-start justify-between mb-3">
          <a href={`/profile/${username}`}>
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.pg" />
                <AvatarFallback className="uppercase">{username ? username.slice(0, 2) : "🥷"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold hover:text-accent transition">{username}</p>
                <p className="text-xs text-muted-foreground">@{username} • 2h ago</p>
              </div>
            </div>
          </a>
          {/* {address && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Follow</DropdownMenuItem>
              <DropdownMenuItem>Mute</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )} */}
        </div>

        <div
          className="w-full post-content flex flex-col my-5 gap-3 flex-wrap overflow-hidden whitespace-pre-wrap break-words leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />

        {/* Engagement */}
        <div className="w-full flex gap-8 text-muted-foreground mb-3 pt-3">
          {address && (
            <>
              <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
                <MessageCircle className="w-4 h-4" />
                <span>{comments}</span>
              </button>

              <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
                <Heart className="w-4 h-4" />
                <span>{likes}</span>
              </button>
            </>
          )}
          <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
            <Share2 className="w-4 h-4" />
            {/* <span>89</span> */}
          </button>
        </div>
      </div>
      <hr className="border mt-10 mb-10 w-full" />
    </div>
  );
}
