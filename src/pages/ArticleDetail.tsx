// src/pages/ArticlePage.tsx — FINAL FIXED VERSION (No duplicate title)
"use client";

import { useParams, useNavigate, data } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, MessageSquare } from "lucide-react";
import axios from "axios";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

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
        const titleBlockIndex = blocks.findIndex((b: any) => b.type === "heading" && b.content?.length > 0);

        let title = "Untitled";
        let contentBlocks = blocks;

        if (titleBlockIndex !== -1) {
          title = blocks[titleBlockIndex].content?.map((c: any) => c.text || "").join("") || "Untitled";

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

  return (
    <div className="min-h-screen bg-background w-full">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-xl">Loading article...</p>
          </div>
        </div>
      ) : error || !article ? (
        <div className="grid place-items-center h-screen w-full">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquare />
              </EmptyMedia>
              <EmptyTitle>No Article Found</EmptyTitle>
              <EmptyDescription>This article does not exists.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button className="cursor-pointer" onClick={() => navigate("/create/article")}>
                  Create Article
                </Button>
                <Button className="cursor-pointer" onClick={() => navigate("/articles")}>
                  Go back
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="width-article w-full mx-auto px-6 py-12">
            <Button variant="link" className="cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft /> Back
            </Button>

            {/* Beautiful Title */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 tracking-tight">{article.title}</h1>

            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xl">{article.username.slice(0, 2).toUpperCase()}</div>
                <div>
                  <p className="font-semibold text-lg">@{article.username}</p>
                  {/* <p className="text-sm">Published on Irys • Permanent & Decentralized</p> */}
                </div>
              </div>
              <a href={`https://gateway.irys.xyz/${article.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition">
                View on Irys
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <hr className="border mt-10 mb-10 w-full" />

          <div className="width-article w-full mx-auto px-6 py-16">
            <article className="prose prose-invert prose-lg max-w-none">
              <BlockNoteView editor={editor} editable={false} theme="dark" />
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
