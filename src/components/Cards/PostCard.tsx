"use client";

import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccount } from "wagmi";
import DOMPurify from "dompurify";

interface PostCardProps {
  featured?: boolean;
  content: string
}

export function PostCard({ featured = false, content }: PostCardProps) {
  const { address } = useAccount();

  return (
    <div
      className={`md:max-w-[700px] lg:max-w-[1000px] bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer group ${
        featured ? "ring-2 ring-accent/30" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold hover:text-accent transition">Creator Name</p>
            <p className="text-xs text-muted-foreground">@handle • 2h ago</p>
          </div>
        </div>
        {address && (
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
        )}
      </div>

      {/* Content */}
      {/* <div className="mb-3">
        <p className="text-foreground">Just launched our new feature that lets creators monetize their content directly. This changes everything for independent creators! 🚀</p>
      </div> */}

      <div
        className="post-content flex items-center gap-3 flex-wrap overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />

      {/* Image */}
      {/* <div className="mb-3 rounded-lg overflow-hidden bg-secondary h-64">
        <img
          src="https://images.unsplash.com/photo-1584432743501-7d5c27a39189?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmljZSUyMHZpZXd8ZW58MHx8MHx8fDA%3D"
          alt="Post image"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div> */}

      {/* Engagement */}
      <div className="flex gap-8 text-muted-foreground mb-3 border-t border-border pt-3">
        {address && (
          <>
            <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
              <MessageCircle className="w-4 h-4" />
              <span>234</span>
            </button>

            <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
              <Heart className="w-4 h-4" />
              <span>1.2K</span>
            </button>
          </>
        )}
        <button className="flex items-center gap-2 text-sm hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition">
          <Share2 className="w-4 h-4" />
          <span>89</span>
        </button>
      </div>
    </div>
  );
}
