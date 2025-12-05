import { getIrysUploader } from "@/lib/irys";

export const createarticle = async (articleContent: object, author: string, username: string) => {
  const irys = await getIrysUploader();
  console.log("datatoUploadopsppss", articleContent)

  const tags = [
    { name: "app-id", value: `${import.meta.env.VITE_APP_ID}` },
    { name: "type", value: `${import.meta.env.VITE_TYPE_ARTICLE}` },
    { name: "Content-Type", value: "application/json" },
    { name: "author", value: author },
    { name: "username", value: username },
  ];

  const receipt = await irys.upload(JSON.stringify(articleContent), { tags });
  console.log(`Article uploaded successfully: https://gateway.irys.xyz/${receipt.id}`);
  return receipt.id;
};
