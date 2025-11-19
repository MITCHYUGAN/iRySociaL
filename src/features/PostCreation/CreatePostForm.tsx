import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, Video } from "lucide-react";
import { useState } from "react";

const CreatePostForm = () => {
  const [postValue, setValue] = useState("");
  const [isFocused, setIsfocused] = useState(false);

  const createPost = () => {
    console.log("Post Value", postValue);
  };
  return (
    <section className="flex flex-col gap-10" aria-label="mainfeed whats on your mind">
      <div className="flex gap-5">
        <Avatar className="w-[50px] h-[50px] hidden md:block self-start">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>🥷</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-5">
          <Textarea
            value={postValue}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[60px]"
            placeholder="What's on your mind?"
            onFocus={() => setIsfocused(true)}
            onBlur={() => setIsfocused(false)}
          />

          <input type="file" placeholder="Upload a image" />

          {isFocused && (
            <div className="flex justify-between">
              <div className="flex gap-5">
                <Image />
                <Smile />
                <Video />
              </div>
              <Button className="cursor-pointer" onClick={createPost}>
                Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatePostForm;
