import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowLeft, Globe, Lock, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
// import { Link } from "react-router-dom";

const CreateArticlePage = () => {
  const [isGated, setIsGated] = useState(false);
  const navigate = useNavigate();
  const { address } = useAccount();

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
            <h1 className="md:text-6xl text-3xl font-bold tracking-tight">Create an Article</h1>
            <p className="text-1xl md:text-[20px] text-muted-foreground">
              Store your post permanently on <span className="text-primary">Irys</span>
            </p>
          </section>

          <div className="w-[1400px] mx-auto px-4 py-8 flex flex-col">

            <textarea name="" className="w-full max-h-[100px] text-white p-5  text-5xl border-none outline-none" id="" placeholder="Title"></textarea>
            <textarea name="" className="w-full min-h-[500px] text-white p-5 text-2xl outline-none" id="" placeholder="Share your thoughts"></textarea>
            {/* <div className="w-full md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Enter your article title..." className="text-lg font-semibold" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                  <CardDescription>Write your article using Markdown format</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="# Start writing... Write your article here. You can use markdown formatting like **bold**, *italic*, and more."
                    rows={12}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <div className="p-4 rounded-lg bg-secondary">
                    <h1 className="text-2xl font-bold mb-4">Your article preview will appear here</h1>
                    <p className="text-muted-foreground">Start writing to see the preview</p>
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={() => setIsGated(false)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors flex items-center gap-3 ${!isGated ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                  >
                    <Globe className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Public</p>
                      <p className="text-xs text-muted-foreground">Free for everyone</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsGated(true)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors flex items-center gap-3 ${isGated ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                  >
                    <Lock className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Gated</p>
                      <p className="text-xs text-muted-foreground">Paid access</p>
                    </div>
                  </button>
                </CardContent>
              </Card>

              {isGated && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price ($)</label>
                      <Input type="number" placeholder="4.99" min="0.99" step="0.01" />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <Input placeholder="programming, web, tutorial..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Read Time (min)</label>
                    <Input type="number" placeholder="5" min="1" />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button className="w-full bg-accent text-accent-foreground">Publish Article</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </div> */}
          </div>

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

export default CreateArticlePage;
