import { getIrysUploader } from "@/lib/irys";

export const createprofile = async (username: string, bio: string, author: string) => {
  const irys = await getIrysUploader();

  const dataToUpload = {
    username,
    bio,
    author,
    createdAt: Date.now(),
  };

  const tags = [
    { name: "app-id", value: `${import.meta.env.VITE_APP_ID}` },
    { name: "type", value: `${import.meta.env.VITE_TYPE_PROFILE}` },
    { name: "Content-Type", value: "application/json" },
    { name: "author", value: author },
    { name: "username", value: username },
  ];

  const receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });
  console.log(`Profile created successfully: https://gateway.irys.xyz/${receipt.id}`);
  return receipt.id;
};
