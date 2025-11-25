import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Smile, ImageIcon, X, AlertCircleIcon, XIcon, CheckCircle2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import { createpost } from "./create-post";
import { getProfile } from "../Profile/onboarding/grapghqLQuery/queryprofile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

// interface CreatePostFormProps {
//   classname: string;
// }

interface MediaPreview {
  file: File;
  preview: string;
  base64: string;
  type: "image";
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
};

const emojis = ["🔥", "🤝", "😅", "😂", "💚", "🥷", "💙", "🔗", "❤️", "🗑️", "👇", "🔎", "🥲"];

const CreatePostForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<MediaPreview[]>([]);
  const { address } = useAccount();
  const [isTXCancel, setTXCancel] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchProfile = async () => {
      const { username, author } = await getProfile(address);

      if (!username && !author) {
        alert("Profile not found");
        setLoading(false);
        setIsValid(false);
        return;
      }
    };

    fetchProfile();
  }, [address]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCreatePost = async () => {
    // Make wallet is connect
    if (!address) {
      setLoading(false);
      alert("Wallet not connected");
      return;
    }

    if (!content && media.length === 0) {
      alert("Pls input a valid content");
      console.log("Mediiaiis", media.length);
      return;
    }

    setLoading(true);

    // make sure the wallet connected has a profile
    const { username, author } = await getProfile(address);

    if (!isValid) {
      alert("Profile not found");
      setLoading(false);
      return;
    }

    const medias = media.map((m) => m.base64);
    console.log("Medias", medias);

    const imagesHTML = medias.map((src) => `<img src="${src}" />`).join("");

    const dataToUpload = `<p>${content}</p> <div>${imagesHTML}</div>`;

    console.log("dataatateup", dataToUpload);

    try {
      const postId = await createpost(dataToUpload, author, username);
      console.log("POSTID", postId);

      setTimeout(function () {
        setIsProfileCreated(true);
      }, 1000);

      setLoading(false);
      setContent("");
      setMedia([]);

      setTimeout(function () {
        navigate("/posts");
      }, 3000);

      return;
    } catch (error) {
      console.error("Error while creating post", error);

      if (error instanceof Error && error.message.includes("user rejected action")) {
        setTimeout(function () {
          setTXCancel(true);
        }, 1000);
      }

      setLoading(false);
      return;
    }
  };

  const addEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const processed = await Promise.all(
      Array.from(files).map(async (file) => {
        const base64 = await fileToBase64(file); // 🔥 convert here
        return {
          file,
          preview: URL.createObjectURL(file),
          base64, // 🔥 store base64
          type: file.type.startsWith("video/") ? "video" : "image",
        };
      })
    );

    setMedia((prev) => [...prev, ...processed]);

    e.target.value = "";
  };

  const triggerMediaUpload = () => {
    fileInputRef.current?.click();
  };

  const removeMedia = (index: number) => {
    URL.revokeObjectURL(media[index].preview);
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="w-full flex flex-col gap-10" aria-label="mainfeed whats on your mind">
      <div className="flex gap-5">
        <Avatar className="w-[50px] h-[50px] hidden md:block self-start">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>🥷</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-5">
          <div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full  border-none focus:border-none focus:outline-none text-1xl md:text-[20px] border-none focus-visible:shadow-none"
              placeholder="What's on your mind?"
              onFocus={() => setIsFocused(true)}
              // onBlur={() => setIsFocused(false)}
            />
            {media.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {media.map((item, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden bg-secondary/30 border border-border">
                    <div className="aspect-video relative">
                      <img src={item.preview || "/placeholder.svg"} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => removeMedia(index)} className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isFocused && (
            <div className="flex justify-between">
              <div className="flex gap-5">
                <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleMediaUpload} />

                  <button onClick={triggerMediaUpload} className="p-[10px] hover:bg-[#171717] cursor-pointer rounded-[10px] transition text-primary" title="Media">
                    <ImageIcon />
                  </button>
                </div>

                {/* Choose and add remoji */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-[10px] hover:bg-[#171717] cursor-pointer rounded-[10px] transition text-primary">
                      <Smile />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="leading-none font-medium">Emojis</h4>
                        <p className="text-muted-foreground text-sm">Select from the few below</p>
                      </div>
                      <div className="grid grid-cols-10 gap-2">
                        {emojis.map((emoji) => (
                          <button key={emoji} className="cursor-pointer" onClick={() => addEmoji(emoji)}>
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {/* <Video /> */}
              </div>

              <Button disabled={!isValid || loading} className="cursor-pointer py-6" onClick={handleCreatePost}>
                {loading ? (
                  <>
                    <Spinner />
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {isTXCancel && (
        <Alert variant={"destructive"} className="w-[60%] z-100 md:w-[400px] absolute bottom-20 right-6">
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
        <Alert variant={"default"} className="w-[60%] z-100 md:w-[400px] absolute bottom-20 right-6 border-primary">
          <CheckCircle2Icon className="text-primary" />
          <button className="cursor-pointer absolute right-3 top-3" onClick={() => setIsProfileCreated(false)}>
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </button>
          <AlertTitle className="max-md:text-[15px] text-primary">Successful</AlertTitle>
          <AlertDescription className="max-md:text-[12px]">
            Your post has been uploaded successfully
            <a className="text-primary underline" target="blank_" href="https://gateway.irys.xyz/AZzqVLk4WgymrDYrrkxq4t8cym8qCbPkivay2UKsnPKC">
              View here
            </a>
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
};

export default CreatePostForm;
