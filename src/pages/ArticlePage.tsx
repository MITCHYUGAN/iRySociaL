// src/pages/ArticlePage.tsx — FINAL FIXED VERSION (No duplicate title)
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import axios from "axios";

const GATEWAY_URL = "https://gateway.irys.xyz";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // CHANGE: Create editor at top level — always
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${GATEWAY_URL}/${id}`);
        const raw = res.data;

        let blocks;
        try {
          blocks = typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch (e) {
          throw new Error("Invalid article data");
        }

        if (!Array.isArray(blocks) || blocks.length === 0) {
          throw new Error("Article is empty");
        }

        // CHANGE: Extract title from first heading
        const titleBlockIndex = blocks.findIndex(
          (b: any) => b.type === "heading" && b.content?.length > 0
        );

        let title = "Untitled";
        let contentBlocks = blocks;

        if (titleBlockIndex !== -1) {
          title = blocks[titleBlockIndex].content
            ?.map((c: any) => c.text || "")
            .join("") || "Untitled";

          // CHANGE: Remove the title block from content
          contentBlocks = blocks.filter((_: any, i: number) => i !== titleBlockIndex);
        }

        // CHANGE: Get username from tags
        const tagsRes = await axios.get(`${GATEWAY_URL}/${id}`);
        const tagsHeader = tagsRes.headers["x-irys-tags"] || "";
        const usernameMatch = tagsHeader.match(/username:([^,]+)/);
        const username = usernameMatch ? usernameMatch[1] : "anonymous";

        setArticle({ id, title, username, blocks: contentBlocks });
      } catch (err) {
        console.error("Failed to load article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // CHANGE: Load content blocks (without title)
  useEffect(() => {
    if (article?.blocks) {
      editor.replaceBlocks(editor.document, article.blocks);
    }
  }, [article, editor]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-xl">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {/* Beautiful Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xl">
                {article.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-lg">@{article.username}</p>
                <p className="text-sm">Published on Irys • Permanent & Decentralized</p>
              </div>
            </div>
            <a
              href={`https://gateway.irys.xyz/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition"
            >
              View on Irys
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Clean Article Body — No duplicate title */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          <BlockNoteView editor={editor} editable={false} theme="dark" />
        </article>
      </div>
    </div>
  );
}