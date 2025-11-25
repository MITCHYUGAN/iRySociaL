import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Smile, ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import { createpost } from "./create-post";
import { getProfile } from "../Profile/onboarding/grapghqLQuery/queryprofile";

// interface CreatePostFormProps {
//   classname: string;
// }

interface MediaPreview {
  file: File;
  preview: string;
  type: "image" | "video"; // Track whether it's an image or video
}

// const CreatePostForm = ({ classname }: CreatePostFormProps) => {
//   const [isFocused, setIsFocused] = useState(false)
//   const [content, setContent] = useState("")
//   const [media, setMedia] = useState<MediaPreview[]>([])
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     return () => {
//       media.forEach((item) => URL.revokeObjectURL(item.preview))
//     }
//   }, [media])

//   const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (files) {
//       const newMedia = Array.from(files).map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//         type: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
//       }))
//       setMedia((prev) => [...prev, ...newMedia])
//     }
//     e.target.value = ""
//   }

//   const removeMedia = (index: number) => {
//     URL.revokeObjectURL(media[index].preview)
//     setMedia((prev) => prev.filter((_, i) => i !== index))
//   }

//   const addEmoji = (emoji: string) => {
//     setContent((prev) => prev + emoji)
//   }

//   const handleSubmit = () => {
//     console.log("Submitting Post:", {
//       text: content,
//       mediaCount: media.length,
//       media: media.map((item) => ({
//         name: item.file.name,
//         size: item.file.size,
//         type: item.file.type,
//         mediaType: item.type, // 'image' or 'video'
//         file: item.file, // The actual file object you'll upload
//       })),
//     })

//     media.forEach((item) => URL.revokeObjectURL(item.preview))
//     setContent("")
//     setMedia([])
//     setIsFocused(false)
//   }

//   const triggerMediaUpload = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div className={`space-y-3 ${classname}`}>
//       <div className="flex gap-4">
//         <Avatar className="h-12 w-12">
//           <AvatarImage src="https://github.com/shadcn.png" />
//           <AvatarFallback>U</AvatarFallback>
//         </Avatar>
//         <div className="flex-1 space-y-4">
//           <div className={`${isFocused ? "min-h-[120px]" : ""} transition-all`}>
//             <Textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="What's on your mind?"
//               className="min-h-[48px] resize-none bg-transparent border-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
//               onFocus={() => setIsFocused(true)}
//             />
//             {media.length > 0 && (
//               <div className="grid grid-cols-2 gap-2 mt-4">
//                 {media.map((item, index) => (
//                   <div
//                     key={index}
//                     className="relative group rounded-xl overflow-hidden bg-secondary/30 border border-border"
//                   >
//                     <div className="aspect-video relative">
//                       {item.type === "image" ? (
//                         <img
//                           src={item.preview || "/placeholder.svg"}
//                           alt={`Upload ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <video src={item.preview} className="w-full h-full object-cover" controls />
//                       )}
//                     </div>
//                     <button
//                       onClick={() => removeMedia(index)}
//                       className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {(isFocused || content || media.length > 0) && (
//             <div className="flex items-center justify-between border-t border-border pt-3">
//               <div className="flex gap-2">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*,video/*"
//                   className="hidden"
//                   ref={fileInputRef}
//                   onChange={handleMediaUpload}
//                 />
//                 <button
//                   onClick={triggerMediaUpload}
//                   className="p-2 hover:bg-teal-500/10 rounded-full transition text-teal-500"
//                   title="Media"
//                 >
//                   <ImageIcon className="w-5 h-5" />
//                 </button>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <button className="p-2 hover:bg-teal-500/10 rounded-full transition text-teal-500">
//                       <Smile className="w-5 h-5" />
//                     </button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-full p-2" align="start">
//                     <div className="flex gap-2 flex-wrap max-w-[200px]">
//                       {["😀", "😂", "🥰", "😎", "🤔", "🔥", "✨", "🎉", "👍", "❤️", "🚀", "💯"].map((emoji) => (
//                         <button
//                           key={emoji}
//                           onClick={() => addEmoji(emoji)}
//                           className="p-2 hover:bg-secondary rounded text-xl"
//                         >
//                           {emoji}
//                         </button>
//                       ))}
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <Button
//                 onClick={handleSubmit}
//                 disabled={!content && media.length === 0}
//                 className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 font-bold"
//               >
//                 Post
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreatePostForm;

//   // return (
//   //   <div className={`space-y-3 ${classname}`}>
//   //     <div className="flex gap-4">
//   //       <Avatar className="h-12 w-12">
//   //         <AvatarImage src="https://github.com/shadcn.png" />
//   //         <AvatarFallback>U</AvatarFallback>
//   //       </Avatar>
//   //       <div className="flex-1 space-y-4">
//   //         <div className={`${isFocused ? "min-h-[120px]" : ""} transition-all`}>
//   //           <Textarea
//   //             value={content}
//   //             onChange={(e) => setContent(e.target.value)}
//   //             placeholder="What's on your mind?"
//   //             className="min-h-[48px] resize-none bg-transparent border-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
//   //             onFocus={() => setIsFocused(true)}
//   //           />
//   //           {images.length > 0 && (
//   //             <div className="grid grid-cols-2 gap-2 mt-4">
//   //               {images.map((img, index) => (
//   //                 <div
//   //                   key={index}
//   //                   className="relative group rounded-xl overflow-hidden bg-secondary/30 border border-border"
//   //                 >
//   //                   <div className="aspect-video relative">
//   //                     <img
//   //                       src={img.preview || "/placeholder.svg"}
//   //                       alt={`Upload ${index + 1}`}
//   //                       className="w-full h-full object-cover"
//   //                     />
//   //                   </div>
//   //                   <button
//   //                     onClick={() => removeImage(index)}
//   //                     className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
//   //                   >
//   //                     <X className="w-4 h-4" />
//   //                   </button>
//   //                 </div>
//   //               ))}
//   //             </div>
//   //           )}
//   //         </div>
//   //         {(isFocused || content || images.length > 0) && (
//   //           <div className="flex items-center justify-between border-t border-border pt-3">
//   //             <div className="flex gap-2">
//   //               <input
//   //                 type="file"
//   //                 multiple
//   //                 accept="image/*"
//   //                 className="hidden"
//   //                 ref={fileInputRef}
//   //                 onChange={handleImageUpload}
//   //               />
//   //               <button
//   //                 onClick={triggerImageUpload}
//   //                 className="p-2 hover:bg-teal-500/10 rounded-full transition text-teal-500"
//   //                 title="Media"
//   //               >
//   //                 <ImageIcon className="w-5 h-5" />
//   //               </button>
//   //               <Popover>
//   //                 <PopoverTrigger asChild>
//   //                   <button className="p-2 hover:bg-teal-500/10 rounded-full transition text-teal-500">
//   //                     <Smile className="w-5 h-5" />
//   //                   </button>
//   //                 </PopoverTrigger>
//   //                 <PopoverContent className="w-full p-2" align="start">
//   //                   <div className="flex gap-2 flex-wrap max-w-[200px]">
//   //                     {["😀", "😂", "🥰", "😎", "🤔", "🔥", "✨", "🎉", "👍", "❤️", "🚀", "💯"].map((emoji) => (
//   //                       <button
//   //                         key={emoji}
//   //                         onClick={() => addEmoji(emoji)}
//   //                         className="p-2 hover:bg-secondary rounded text-xl"
//   //                       >
//   //                         {emoji}
//   //                       </button>
//   //                     ))}
//   //                   </div>
//   //                 </PopoverContent>
//   //               </Popover>
//   //             </div>
//   //             <Button
//   //               onClick={handleSubmit}
//   //               disabled={!content && images.length === 0}
//   //               className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 font-bold"
//   //             >
//   //               Post
//   //             </Button>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   </div>
//   // )

//
// };

const emojis = ["🔥", "🤝", "😅", "😂", "💚", "🥷", "💙", "🔗", "❤️", "🗑️", "👇", "🔎", "🥲"];

const CreatePostForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<MediaPreview[]>([]);
  const {address} = useAccount()

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCreatePost = async () => {

    // Make wallet is connect
    if (!address) {
      // setLoading(false);
      alert("Wallet not connected");
      return;
    }

    // make sure the wallet connected has a profile
    const {username, author} = await getProfile(address)

    if (!username && !author) {
      alert("Profile not found")
      return
    }


    const medias = media[0].preview;

    const dataToUpload = `<p>${content}</p><img src="${medias}">`;

    console.log("dataatateup", dataToUpload)

    try {
      const postId = await createpost(dataToUpload, author, username )
      console.log("POSTID", postId)
    } catch (error) {
      console.error("Error while creating post", error);
      return
    }
  };

  const addEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newMedia = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
      }));

      setMedia((prev) => [...prev, ...newMedia]);
    }

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
              <div className="grid grid-cols-2 gap-2 mt-4">
                {media.map((item, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden bg-secondary/30 border border-border">
                    <div className="aspect-video relative">
                      {item.type === "image" ? (
                        <img src={item.preview || "/placeholder.svg"} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <video src={item.preview} className="w-full h-full object-cover" controls />
                      )}
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
                  <input type="file" accept="image/*, video/*" className="hidden" ref={fileInputRef} onChange={handleMediaUpload} />

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
              <Button className="cursor-pointer" onClick={handleCreatePost}>
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
