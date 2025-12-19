import { useQuery } from "@tanstack/react-query";
import { getArticles, getArticlesById, getUserArticles } from "@/features/CreateArticle/grapghqLQuery/queryarticle";

const transformArticle = (art: any) => {
  const previewBlock = art.blocks.find((b: any) => b.type === "paragraph" && b.content?.length > 0);
  const preview =
    previewBlock?.content
      ?.map((c: any) => c.text || "")
      .join(" ")
      .slice(0, 160) || "No preview...";

  const coverImageBlock = art.blocks.find((b: any) => b.type === "image");
  const coverImage = coverImageBlock?.props?.url;

  return {
    id: art.id,
    title: art.title,
    preview: preview + (preview.length >= 160 ? "..." : ""),
    username: art.username,
    author: art.author,
    createdAt: art.createdAt || Date.now(),
    coverImage,
    isGated: false,
  };
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const data = await getArticles();
      return data.map(transformArticle);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useArticleById = (articleId: string | undefined) => {
  return useQuery({
    queryKey: ["article", articleId], // ← Unique per ID
    queryFn: async () => {
      if (!articleId) throw new Error("No ID");
      const data = await getArticlesById(articleId);
      if (data.length === 0) throw new Error("Article not found");
      console.log("Datatatat", data)
      return data[0];
    },
    enabled: !!articleId, // Don't run if no ID
    staleTime: 1000 * 60 * 10,
  });
};


export const useUserArticles = (username: string) => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const data = await getUserArticles(username);
      return data.map(transformArticle);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
