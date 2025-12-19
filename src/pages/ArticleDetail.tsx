// src/pages/ArticlePage.tsx — FINAL FIXED VERSION (No duplicate title)
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, MessageSquare } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useArticleById } from "@/lib/queries";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [article, setArticle] = useState<any>(null);

  const { data: article, isLoading, error } = useArticleById(id);
  console.log("Dattattata", article);

  const editor = useCreateBlockNote();

  useEffect(() => {
    if (!article?.blocks || !Array.isArray(article.blocks)) {
      return;
    }

    let finalContent = article.blocks;

    console.log({ finalContent });
    console.log("Arrticle Blocks", article.blocks);

    // const firstHeading = article.blocks[0];

    let title = article.title;

    // Case 1: First block is heading → use it as title, remove from content
    if (finalContent[0]?.type === "heading" && finalContent[0]?.content?.length > 0) {
      title = finalContent[0].content.map((c: any) => c.text || "").join("");
      finalContent = finalContent.slice(1); // Remove heading
    }

    // Case 2: First block is image → keep image, remove the SECOND block if it's heading
    if (finalContent[0]?.type === "image" && finalContent[1]?.type === "heading") {
      // Extract title from second block
      title = finalContent[1].content?.map((c: any) => c.text || "").join("") || title;
      finalContent = finalContent.filter((_: any, i: number) => i !== 1); // Remove second block only
    }

    // // Remove the first block if it has a type of heading
    // if (firstHeading.type === "heading") {
    //   finalContent = article.blocks.slice(1, 160) || "No preview...";
    // }

    // // remove the second block if the first block has a type of image, (meaning the user added a preview image)
    // // So remove just the second block. display the first remove the second, and continue to display the rest from the third
    // if (firstHeading.type === "image") {
    //   finalContent = article.blocks.slice(0, 160) || "No preview...";
    // }

    document.title = `${title} — Irys Social`

    editor.replaceBlocks(editor.document, finalContent);
  }, [article, editor]);

  // useEffect(() => {
  //   if (!id) {
  //     setError(true);
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchArticle = async () => {
  //     try {
  //       const res = await axios.get(`${GATEWAY_URL}/${id}`);
  //       const raw = res.data;

  //       let blocks;
  //       try {
  //         blocks = typeof raw === "string" ? JSON.parse(raw) : raw;
  //       } catch (e) {
  //         throw new Error("Invalid article data");
  //       }

  //       if (!Array.isArray(blocks) || blocks.length === 0) {
  //         throw new Error("Article is empty");
  //       }

  //       // CHANGE: Extract title from first heading
  //       const titleBlockIndex = blocks.findIndex((b: any) => b.type === "heading" && b.content?.length > 0);

  //       let title = "Untitled";
  //       let contentBlocks = blocks;

  //       if (titleBlockIndex !== -1) {
  //         title = blocks[titleBlockIndex].content?.map((c: any) => c.text || "").join("") || "Untitled";

  //         // CHANGE: Remove the title block from content
  //         contentBlocks = blocks.filter((_: any, i: number) => i !== titleBlockIndex);
  //       }

  //       // CHANGE: Get username from tags
  //       const tagsRes = await axios.get(`${GATEWAY_URL}/${id}`);
  //       const tagsHeader = tagsRes.headers["x-irys-tags"] || "";
  //       const usernameMatch = tagsHeader.match(/username:([^,]+)/);
  //       const username = usernameMatch ? usernameMatch[1] : "anonymous";

  //       setArticle({ id, title, username, blocks: contentBlocks });
  //     } catch (err) {
  //       console.error("Failed to load article:", err);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArticle();
  // }, [id]);

  // CHANGE: Load content blocks (without title)
  // useEffect(() => {
  //   if (article?.blocks) {
  //     editor.replaceBlocks(editor.document, article.blocks);
  //   }
  // }, [article, editor]);

  return (
    <div className="min-h-screen bg-background article-detail w-full">
      {isLoading ? (
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
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 tracking-tight h1textfamily">{article.title}</h1>

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
