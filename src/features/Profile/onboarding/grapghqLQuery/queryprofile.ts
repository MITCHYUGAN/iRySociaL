import axios from "axios";

const GRAPHQL_ENDPOINT = "https://devnet.irys.xyz/graphql";
const GATEWAY_URL = "https://devnet.irys.xyz";

export const graphqlQuery = async (query: string) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, { query });
  // console.log("GraphQL Response", response.data)

  if(response.data.errors){
    console.error("GraphQL Errors:", response.data.errors)
    throw new Error("GraphQL query failed");
  }

  return response.data.data.transactions
};

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

  const response = await axios.post(GRAPHQL_ENDPOINT, { query });
  const edges = response.data.data.transactions.edges;

  if (edges.length > 0) {
    const id = edges[0].node.id;
    const contentResponse = await axios.get(`${GATEWAY_URL}/${id}`);
    return contentResponse.data;
  }
  return null;
};

export const checkUsername = async (username: string) => {
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

export const getProfileByUsername = async (username: string) => {
  const query = `
    query {
      transactions(
        tags: [
          { name: "app-id", values: ["${import.meta.env.VITE_APP_ID}"] }
          { name: "type", values: ["${import.meta.env.VITE_TYPE_PROFILE}"] }
          { name: "username", values: ["${username.replace(/^@/, "")}"] }
        ],
        order: DESC,
        limit: 1
      ) {
        edges {
          node {
            id
            tags { name value }
          }
        }
      }
    }
  `;

  const { edges } = await graphqlQuery(query);
  console.log("Edges", edges)

  if (edges.length === 0) {
    return null;
  }
  const profileData = await (await fetch(`https://devnet.irys.xyz/${edges[0].node.id}`)).json();
  return profileData;
};
