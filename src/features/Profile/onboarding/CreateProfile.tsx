import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, ArrowLeft, CheckCircle2Icon, Wallet, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { createprofile } from "./create-profile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkUsername, getProfile } from "./grapghqLQuery/queryprofile";

const CreateProfile = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [usernameError, setUsernameError] = useState();

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkprofile = async () => {
      const profile = await getProfile(address);

      if (profile) {
        navigate("/");
      }
    };

    checkprofile();
  }, [address, navigate]);

  const cleanUsername = (input: string) => {
    return input.replace(/^@+/, ""); // Remove any leading @ symbols
  };

  const handleUsernameChange = async (input: string) => {
    const cleaned = cleanUsername(input);
    setUsername(cleaned);

    if (cleaned) {
      const exists = await checkUsername(cleaned);
      setUsernameError(exists ? "Username already taken, choose another one" : "");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username) {
      setLoading(false);
      alert("Pls input a Valid username");
      return;
    }

    if (!address) {
      setLoading(false);
      alert("Wallet not connected");
      return;
    }

    const exists = await checkUsername(username);

    if (exists) {
      setLoading(false);
      return;
    }

    try {
      await createprofile(username, bio, address);
      setLoading(false);

      setTimeout(function () {
        setIsProfileCreated(true);
      }, 1000);

      const getUserProfile = await getProfile(address)

      console.log("getUserProfile", getUserProfile)

      setTimeout(() => {
        navigate(`/profile/${getUserProfile.username}`);
      }, 3000);

    } catch (error: unknown) {
      console.log("Error while creating profile", error);

      setTimeout(function () {
        setIsError(true);
        setErrorMessage(error.message);
      }, 1000);

      setLoading(false);
      return;
    }
  };

  const isValid = username.trim().length >= 3 && username.trim().length <= 20 && usernameError === "";

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
          </EmptyContent>
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
                  <Input value={username ? `@${username}` : ""} placeholder="@username" maxLength={20} onChange={(e) => handleUsernameChange(e.target.value)} className="w-full pl-2 text-base h-11" />
                </div>
                <div className="flex justify-between pt-1">
                  <p className="text-xs text-muted-foreground">3-20 characters, lowercase & numbers (without the @)</p>
                  <p className={`text-xs font-semibold ${isValid ? "text-primary" : "text-muted-foreground"}`}>{username.length}/20</p>
                </div>
                <p className="text-red-900">{usernameError}</p>
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
                  <p className="text-[15px] font-mono max-sm:hidden">{address}</p>
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

          {isError && (
            <Alert variant={"destructive"} className="w-[60%] overflow-scroll md:w-[400px] absolute bottom-20 right-6">
              <AlertCircleIcon />
              <button className="cursor-pointer absolute right-3 top-3" onClick={() => setIsError(false)}>
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
              {/* <AlertTitle className="max-md:text-[15px]">TX Cancelled</AlertTitle>
              <AlertDescription className="max-md:text-[12px] text-gray-400">User cancelled the transaction</AlertDescription> */}
              <AlertDescription>{errorMessage.slice(0, 50)}</AlertDescription>
            </Alert>
          )}

          {isProfileCreated && (
            <Alert variant={"default"} className="w-[60%] md:w-[400px] absolute bottom-20 right-6 border-primary">
              <CheckCircle2Icon className="text-primary" />
              <button className="cursor-pointer absolute right-3 top-3" onClick={() => setIsProfileCreated(false)}>
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
              <AlertTitle className="max-md:text-[15px] text-primary">Successful</AlertTitle>
              <AlertDescription className="max-md:text-[12px]">Your profile has been successfully created</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateProfile;
