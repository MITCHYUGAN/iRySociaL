import { getIrysUploader } from "@/lib/irys";

export const createpost = async (content: string, author: string, username: string) => {
  const irys = await getIrysUploader();

  const dataToUpload = content;

  console.log("datatoUploadopsppss", dataToUpload)

  const tags = [
    { name: "app-id", value: `${import.meta.env.VITE_APP_ID}` },
    { name: "type", value: `${import.meta.env.VITE_TYPE_POST}` },
    { name: "Content-Type", value: "text/html" },
    { name: "author", value: author },
    { name: "username", value: username },
  ];

  const receipt = await irys.upload(dataToUpload, { tags });
  console.log(`Post created successfully: https://gateway.irys.xyz/${receipt.id}`);
  return receipt.id;
};
