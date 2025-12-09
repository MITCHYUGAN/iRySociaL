import { useQuery } from "@tanstack/react-query";
import { getArticles, getUserArticles } from "@/features/CreateArticle/grapghqLQuery/queryarticle";

// Transform article for cards (title, preview, etc)
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
