import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircleIcon, ArrowLeft, CheckCircle2Icon, Upload, Wallet, X, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState } from "react";
import { type Block } from "@blocknote/core";
import { getIrysUploader } from "@/lib/irys";
import { getProfile } from "../Profile/onboarding/grapghqLQuery/queryprofile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createarticle } from "./create-article";

const CreateArticlePage = () => {
  // const [isGated, setIsGated] = useState(false);
  const navigate = useNavigate();
  const { address } = useAccount();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isArticleCreated, setIsArticleCreated] = useState(false);
  const [PostId, setPostId] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // const isEditorEmpty = () => {
  //   const document = editor.document;

  //   // Check if the document has only one block
  //   if (document.length === 1) {
  //     const firstBlock = document[0];

  //     console.log("First Block", firstBlock)

  //     // Check if the first block is a paragraph type
  //     if (firstBlock.type === "heading") {
  //       // Check if the paragraph's content array is empty or contains only whitespace
  //       if (!firstBlock.content || firstBlock.content.length === 0) {
  //         return true; // The editor is considered empty
  //       }
  //     }
  //   }

  //   // For all other cases, it's not empty
  //   return false;
  // };

  const handleArticleUpload = async () => {
    console.log("contents", blocks);

    if (!blocks.length) {
      alert("Editor is empty, cannot save.");
      return;
    }

    const firstBlock = editor.document[0];
    const title = firstBlock.type === "heading" ? firstBlock.content.map((c) => c.text).join("") : "Untitled Article";

    try {
      if (!address) {
        alert("Wallet not connected");
        throw new Error("Wallet not connected");
      }

      const { username, author } = await getProfile(address);
      if (!username || !author) throw new Error("Profile not found");

      // CHANGE: Stringify JSON
      // const jsonContent = JSON.stringify(editor.document);

      if (coverImage) {
        editor.insertBlocks(
          [
            {
              type: "image",
              props: {
                url: coverImage,
                caption: "",
                showPreview: true,
                textAlignment: "center",
              },
            },
          ],
          editor.document[0],
          "before"
        );
      }

      // CHANGE: Upload JSON to Irys
      const postId = await createarticle(editor.document, author, username);

      // CHANGE: Show success alert like profile creation
      setPostId(`https://gateway.irys.xyz/${postId}`);

      setTimeout(function () {
        setIsArticleCreated(true);
      }, 1000);

      setTimeout(() => navigate("/articles"), 3000);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";

      setTimeout(function () {
        setIsError(true);
        setErrorMessage(message);
      }, 1000);

      // setLoading(false);
      return;
    }
  };

  async function uploadFile(file: File) {
    try {
      const irys = await getIrysUploader();
      const tags = [{ name: "Content-Type", value: file.type }];
      const receipt = await irys.uploadFile(file, { tags });
      return `https://gateway.irys.xyz/${receipt.id}`;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error; // Let BlockNote handle error UI
    }
  }

  const uploadCover = async (file: File) => {
    setUploading(true);
    try {
      const irys = await getIrysUploader();
      const receipt = await irys.uploadFile(file, {
        tags: [{ name: "Content-Type", value: file.type }],
      });
      const url = `https://gateway.irys.xyz/${receipt.id}`;
      setCoverImage(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";

      setTimeout(function () {
        setIsError(true);
        setErrorMessage(message);
      }, 1000);
    } finally {
      setUploading(false);
    }
  };

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "Title",
      },
      {
        type: "paragraph",
        content: "Tell your story",
      },
    ],
    uploadFile,
  });

  return (
    <div className="w-full h-screen flex flex-col items-center max-md:mt-[100px] mt-[40px] article-page">
      {!address ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Wallet />
            </EmptyMedia>
            <EmptyTitle>Wallet not connected</EmptyTitle>
            <EmptyDescription>You need to connect a wallet before you can write an article.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <ConnectButton />
          </EmptyContent>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
              // disconnect();
            }}
          >
            <ArrowLeft />
            Back
          </Button>
        </Empty>
      ) : (
        <div className="w-full flex flex-col items-center max-md:p-7">
          <div className="w-[70%] mx-auto px-4 py-8 flex flex-col gap-10">
            <section className="flex justify-between items-start gap-3">
              <Button
                variant="link"
                className="cursor-pointer"
                onClick={() => {
                  navigate("/");
                  // disconnect();
                }}
              >
                <ArrowLeft />
                Back
              </Button>
              {/* <h1 className="md:text-6xl text-3xl font-bold tracking-tight">Write your article</h1> */}
              {/* <p className="text-1xl md:text-[20px] text-muted-foreground">
                Store your post permanently on <span className="text-primary">Irys</span>
              </p> */}

              <Button className="py-[25px] px-[20px] text-1xl text-black cursor-pointer" onClick={handleArticleUpload}>Publish on Irys</Button>
            </section>

            <div className="relative w-full h-[20vh] bg-none article-border rounded-3xl">
              {coverImage ? (
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer group">
                  <Upload className="w-16 h-16 text-muted-foreground group-hover:text-foreground transition" />
                  <p className="mt-4 text-lg text-muted-foreground group-hover:text-foreground">Drag image or click to add cover image</p>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                </label>
              )}

              {coverImage && (
                <Button size="icon" variant="destructive" className="absolute top-6 right-6" onClick={() => setCoverImage(null)}>
                  <X className="h-5 w-5" />
                </Button>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4" />
                    <p>Uploading cover...</p>
                  </div>
                </div>
              )}
            </div>

            <BlockNoteView
              title="Publish your content on Irys!"
              className="p-0 h-[30vh]"
              onChange={() => {
                // Sets the document JSON whenever the editor content changes.
                setBlocks(editor.document);
              }}
              editor={editor}
              shadCNComponents={
                {
                  // Pass modified ShadCN components from your project here.
                  // Otherwise, the default ShadCN components will be used.
                }
              }
            />
          </div>
        </div>
      )}

      {isError && (
        <Alert variant={"destructive"} className="w-[60%] z-100 md:w-[400px] fixed bottom-20 right-6">
          <AlertCircleIcon />
          <button className="cursor-pointer absolute right-3 top-3" onClick={() => setIsError(false)}>
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </button>
          <AlertDescription>{errorMessage.slice(0, 100)}</AlertDescription>
        </Alert>
      )}

      {isArticleCreated && (
        <Alert variant={"default"} className="w-[60%] z-100 md:w-[400px] fixed bottom-20 right-6 border-primary">
          <CheckCircle2Icon className="text-primary" />
          <button className="cursor-pointer absolute right-3 top-3" onClick={() => setIsArticleCreated(false)}>
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </button>
          <AlertTitle className="max-md:text-[15px] text-primary">Successful</AlertTitle>
          <AlertDescription className="max-md:text-[12px]">
            Your post has been uploaded successfully
            <a className="text-primary underline" target="blank_" href={`${PostId}`}>
              View here
            </a>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CreateArticlePage;
