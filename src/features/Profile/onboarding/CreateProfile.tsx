import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";

const CreateProfile = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yahh");

    setLoading(true);

    if (!username) {
      console.log("Pls input a username");
      setLoading(false);
      return;
    }

    // try {
      
    // } catch (error) {
      
    // }

    console.log("Pig");
  };

  const isValid = username.trim().length >= 3 && username.trim().length <= 20;

  return (
    <div className="w-full h-screen flex flex-col items-center max-md:mt-[100px] md:justify-center">
      {!address ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Wallet />
            </EmptyMedia>
            <EmptyTitle>Wallet not connected</EmptyTitle>
            <EmptyDescription>You need to connect a wallet before you can create a profile.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <ConnectButton />
            {/* <Button onClick={() => connect()}>Connect wallet</Button> */}
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-[50px] max-md:p-7">
          <section className="flex flex-col items-start gap-3">
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                disconnect();
              }}
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="md:text-6xl text-3xl font-bold tracking-tight">
              Welcome to <span className="text-primary">iRyS</span>ociaL
            </h1>
            <p className="text-1xl md:text-2xl text-muted-foreground">Set up your creator profile to get started on the platform</p>
          </section>
          <Card className="md:w-[600px] border-r  outline-0 p-2 md:p-10 bg-[#0a0a0a]">
            <form action="" className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full space-y-2">
                <Label className="text-base font-semibold">
                  Username <span className="text-primary">*</span>
                </Label>
                <div>
                  <Input value={username} placeholder="username" maxLength={20} onChange={(e) => setUsername(e.target.value)} className="w-full pl-2 text-base h-11" />
                </div>
                <div className="flex justify-between pt-1">
                  <p className="text-xs text-muted-foreground">3-20 characters, lowercase & numbers</p>
                  <p className={`text-xs font-semibold ${isValid ? "text-primary" : "text-muted-foreground"}`}>{username.length}/20</p>
                </div>
              </div>

              <div className=" w-full space-y-2">
                <Label htmlFor="bio" className="text-base font-semibold">
                  Bio <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself. What do you create? What are your passions?"
                  className="resize-none text-base min-h-24"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/160</p>
              </div>

              <div className="w-full rounded-lg border border-muted-foreground/10 bg-muted/50 p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Connected Wallet</p>
                <div className="w-full flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                  <p className="text-[15px] font-mono max-sm:hidden">0x742d35Cc6634C0532925a3b844Bc69e4d0d8f3e</p>
                </div>
              </div>

              {/* <div className="w-full rounded-lg bg-teal-500/10 border border-teal-500/20 p-4">
                <p className="md:text-[15px] text-[13px] text-foreground">Your profile is tied to your wallet. <br /> You can change this information later in settings.</p>
              </div> */}

              <Button disabled={!isValid || loading} type="submit" className="cursor-pointer py-6 px-13 text-1xl">
                {loading ? (
                  <>
                    <Spinner />
                    Creating...
                  </>
                ) : (
                  "Create Profile"
                )}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateProfile;
