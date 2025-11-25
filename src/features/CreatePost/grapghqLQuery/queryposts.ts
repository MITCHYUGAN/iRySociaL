import axios from "axios";
// import { APP_ID } from "../components/NoteModal";

const GRAPHQL_ENDPOINT = "https://devnet.irys.xyz/graphql";

const getNotes = async (owner) => {
  const query = `
    query {
      transactions(
        owners: ["${owner}"],
        // tags: [{ name: "application-id", values: ["${APP_ID}"] }],
        order: DESC,
        limit: 100
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

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    const txs = response.data.data.transactions.edges;

    const notes = [];
    for (const edge of txs) {
      const id = edge.node.id;
      const dataUrl = `https://gateway.irys.xyz/${id}`;
      const dataRes = await axios.get(dataUrl);
      let noteData = dataRes.data;
      if (typeof noteData === "string") noteData = JSON.parse(noteData);
      notes.push({ ...noteData, id });
    }

    return notes;
  } catch (error) {
    console.error("Query error:", error);
    return [];
  }
};

export default getNotes;
