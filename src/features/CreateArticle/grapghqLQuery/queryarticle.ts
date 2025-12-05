import { graphqlQuery } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";
import axios from "axios";

interface NodeProps {
  id: string;
  tags: object;
}

interface EdgeProps {
  node: NodeProps;
}

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
    edges.map(async (edge: EdgeProps) => {
      const { id } = edge.node;
      const { tags } = edge.node;

      // console.log("edge.node", edge.node);
      const contentResponse = await axios.get(`${GATEWAY_URL}/${id}`);

      return {
        id,
        jsonBlocks: contentResponse.data,
        tags: tags,
      };
    })
  );

  return articles;
};

// export const getUserArticles = async (author: string, username: string) => {
//   const query = `
//     query {
//       transactions(
//         tags: [
//           { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
//           { name: "type", values: ["${import.meta.env.VITE_TYPE_POST}"] }
//           { name: "Content-Type", values: "text/html" },
//           { name: "author", values: ["${author}"] }
//           { name: "username", values: ["${username}"] },
//         ],
//         order: DESC,
//       ) {
//         edges {
//           node {
//             id
//             tags {
//               name
//               value
//             }
//           }
//         }
//       }
//     }
//     `;

//   const response = await axios.post(GRAPHQL_ENDPOINT, { query });
//   console.log("Post Response:", response);

//   return response;
// };
