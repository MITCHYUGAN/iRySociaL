import { Button } from "@/components/ui/button";
import { Card, 
  // CardContent 
} from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
// import { Textarea } from "@/components/ui/textarea";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowLeft, 
  // ImageIcon, Smile, 
  Wallet } from "lucide-react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import CreatePostForm from "./CreatePostForm";

const CreatePostPage = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  // const [content, setContent] = useState("");
  // const [image, setImage] = useState("");

  // const postContent = () => {
  //   if (!address) {
  //     console.log("Pls connect your wallet");
  //     return;
  //   }

  //   if (!content) {
  //     // setLoading(false);
  //     alert("Content field can't be empty");
  //     return;
  //   }

  //   console.log("Content", content);
  //   console.log("Image", image);
  // };

  return (
    <div className="w-full h-screen flex flex-col items-center max-md:mt-[100px] mt-[40px]">
      {!address ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Wallet />
            </EmptyMedia>
            <EmptyTitle>Wallet not connected</EmptyTitle>
            <EmptyDescription>You need to connect a wallet before you can make a post.</EmptyDescription>
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
        <div className="flex flex-col gap-[50px] max-md:p-7">
          <section className="flex flex-col items-start gap-3">
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
            <h1 className="md:text-6xl text-3xl font-bold tracking-tight">Create a Post</h1>
            <p className="text-1xl md:text-[20px] text-muted-foreground">
              Store your post permanently on <span className="text-primary">Irys</span>
            </p>
          </section>

          <Card className="md:w-[700px] border-r  outline-0 p-2 md:p-10 bg-[#0a0a0a]">
            <CreatePostForm />
          </Card>

          {/* {isTXCancel && (
            <Alert variant={"destructive"} className="w-[60%] md:w-[400px] absolute bottom-20 right-6">
              <AlertCircleIcon />
              <button className="cursor-pointer absolute right-3 top-3" onClick={() => setTXCancel(false)}>
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
              <AlertTitle className="max-md:text-[15px]">TX Cancelled</AlertTitle>
              <AlertDescription className="max-md:text-[12px] text-gray-400">User cancelled the transaction</AlertDescription>
            </Alert>
          )}

          {isProfileCreated && (
            <Alert variant={"default"} className="w-[60%] md:w-[400px] absolute bottom-20 right-6 border-primary">
              <CheckCircle2Icon className="text-primary" />
              <button className="cursor-pointer absolute right-3 top-3" onClick={() => setTXCancel(false)}>
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
              <AlertTitle className="max-md:text-[15px] text-primary">Successful</AlertTitle>
              <AlertDescription className="max-md:text-[12px]">Your profile has been successfully created</AlertDescription>
            </Alert>
          )} */}
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;
