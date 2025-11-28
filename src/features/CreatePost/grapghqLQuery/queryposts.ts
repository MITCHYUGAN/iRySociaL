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

export const getPosts = async () => {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_POST}"] }
          { name: "Content-Type", values: "text/html" },
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

  const posts = await Promise.all(
    edges.map(async (edge: EdgeProps) => {
      const { id } = edge.node;
      const { tags } = edge.node;

      // console.log("edge.node", edge.node);
      const contentResponse = await axios.get(`${GATEWAY_URL}/${id}`, {
        responseType: "text",
      });

      return {
        id,
        content: contentResponse.data,
        tags: tags,
      };
    })
  );

  return posts;
};

// { name: "username", values: ["${username}"] }

export const getUserPost = async (username: string) => {
  console.log("Usernamerjrjr", username)
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_POST}"] }
          { name: "Content-Type", values: "text/html" },
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

  const posts = await Promise.all(
    edges.map(async (edge: EdgeProps) => {
      const { id } = edge.node;
      const { tags } = edge.node;

      // console.log("edge.node", edge.node);
      const contentResponse = await axios.get(`${GATEWAY_URL}/${id}`, {
        responseType: "text",
      });

      return {
        id,
        content: contentResponse.data,
        tags: tags,
      };
    })
  );

  return posts;
};

// const getNotes = async (owner) => {
//   const query = `
//     query {
//       transactions(
//         owners: ["${owner}"],
//         // tags: [{ name: "application-id", values: ["${APP_ID}"] }],
//         order: DESC,
//         limit: 100
//       ) {
//         edges {
//           node {
//             id
//             tags { name value }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const response = await axios.post(GRAPHQL_ENDPOINT, { query });
//     const txs = response.data.data.transactions.edges;

//     const notes = [];
//     for (const edge of txs) {
//       const id = edge.node.id;
//       const dataUrl = `https://gateway.irys.xyz/${id}`;
//       const dataRes = await axios.get(dataUrl);
//       let noteData = dataRes.data;
//       if (typeof noteData === "string") noteData = JSON.parse(noteData);
//       notes.push({ ...noteData, id });
//     }

//     return notes;
//   } catch (error) {
//     console.error("Query error:", error);
//     return [];
//   }
// };

// export default getNotes;
