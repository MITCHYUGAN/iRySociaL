import axios from "axios";

const GRAPHQL_ENDPOINT = "https://devnet.irys.xyz/graphql";
const GATEWAY_URL = "https://devnet.irys.xyz";

export const getProfile = async (author: string) => {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_PROFILE}"] }
          { name: "author", values: ["${author}"] }
        ],
        order: DESC,
        limit: 1
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
    `;

    const response = await axios.post(GRAPHQL_ENDPOINT, {query});
    const edges = response.data.data.transactions.edges

    if(edges.length > 0){
        const id = edges[0].node.id
        const contentResponse = await axios.get(`${GATEWAY_URL}/${id}`)
        return contentResponse.data
    }
    return null
};


export async function checkUsername(username: string) {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_PROFILE}"] }
          { name: "username", values: ["${username}"] }
        ],
        limit: 1
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const response = await axios.post(GRAPHQL_ENDPOINT, { query });
  return response.data.data.transactions.edges.length > 0;
};