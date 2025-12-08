import { graphqlQuery } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";

const GATEWAY_URL = "https://devnet.irys.xyz";

export const getArticles = async () => {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_ARTICLE}"] }
          { name: "Content-Type", values: "application/json" },
        ],
        limit: 10
        order: DESC,
      ) {
        edges {
          node {
            id
            tags {
              name
              value
            }
          }
        }
      }
    }
    `;

  const { edges } = await graphqlQuery(query);

  const articles = await Promise.all(
    edges.map(async (edge: any) => {
      const id = edge.node.id;
      const tags = edge.node.tags.reduce((acc: any, t: any) => {
        acc[t.name] = t.value;
        return acc;
      }, {});

      try {
        const res = await fetch(`${GATEWAY_URL}/${id}`);
        const rawText = await res.text();

        // CHANGE: Parse ONCE and validate
        let blocks;
        try {
          blocks = JSON.parse(rawText);
        } catch (e) {
          console.error("Failed to parse JSON for article:", id);
          return null;
        }

        // CHANGE: Must be array and non-empty
        if (!Array.isArray(blocks) || blocks.length === 0) {
          console.warn("Article has no blocks:", id);
          return null;
        }

        // Extract title from first heading
        const titleBlock = blocks.find((b: any) => b.type === "heading" && b.content?.length > 0);
        const title = titleBlock?.content?.map((c: any) => c.text || "").join("") || "Untitled";

        return {
          id,
          title,
          username: tags.username || "anonymous",
          author: tags.author || "unknown",
          blocks, // ← This is now a clean array of blocks
          createdAt: Date.now(),
        };
      } catch (err) {
        console.error("Failed to load article:", id, err);
        return null;
      }
    })
  );

  return articles.filter(Boolean);
};

export const getUserArticles = async (username: string) => {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_ARTICLE}"] }
          { name: "Content-Type", values: "application/json" },
          { name: "username", values: ["${username}"] }
        ],
        limit: 10
        order: DESC,
      ) {
        edges {
          node {
            id
            tags {
              name
              value
            }
          }
        }
      }
    }
    `;

  const { edges } = await graphqlQuery(query);

  const articles = await Promise.all(
    edges.map(async (edge: any) => {
      const id = edge.node.id;
      const tags = edge.node.tags.reduce((acc: any, t: any) => {
        acc[t.name] = t.value;
        return acc;
      }, {});

      try {
        const res = await fetch(`${GATEWAY_URL}/${id}`);
        const rawText = await res.text();

        // CHANGE: Parse ONCE and validate
        let blocks;
        try {
          blocks = JSON.parse(rawText);
        } catch (e) {
          console.error("Failed to parse JSON for article:", id);
          return null;
        }

        // CHANGE: Must be array and non-empty
        if (!Array.isArray(blocks) || blocks.length === 0) {
          console.warn("Article has no blocks:", id);
          return null;
        }

        // Extract title from first heading
        const titleBlock = blocks.find((b: any) => b.type === "heading" && b.content?.length > 0);
        const title = titleBlock?.content?.map((c: any) => c.text || "").join("") || "Untitled";

        return {
          id,
          title,
          username: tags.username || "anonymous",
          author: tags.author || "unknown",
          blocks, // ← This is now a clean array of blocks
          createdAt: Date.now(),
        };
      } catch (err) {
        console.error("Failed to load article:", id, err);
        return null;
      }
    })
  );

  return articles.filter(Boolean);
};
