import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, Video } from "lucide-react";
import { useState } from "react";

const CreatePostForm = () => {
  const [postValue, setValue] = useState("");
  // const [isFocused, setIsfocused] = useState(true);

  const createPost = () => {
    console.log("Post Value", postValue);
  };
  return (
    <div>
      <section className="flex gap-5" aria-label="mainfeed whats on your mind">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>🥷</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-5">
          <Textarea
            value={postValue}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[60px]"
            placeholder="What's on your mind?"
            // onFocus={() => setIsfocused(true)} onBlur={() => setIsfocused(false)}
          />
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
        </div>
      </section>
    </div>
  );
};

export default CreatePostForm;
