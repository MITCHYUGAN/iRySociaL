import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, MessageSquare, Video } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateModal = ({ open, onOpenChange }: CreateModalProps) => {
  const [, setSelectedType] = useState<"video" | "article" | "post" | null>(null);
  const navigate = useNavigate();

  const contentTypes = [
    {
      id: "post",
      title: "Post",
      description: "Share a quick update",
      icon: MessageSquare,
      href: "/create/post",
    },
    {
      id: "article",
      title: "Article",
      description: "Write and publish an article",
      icon: BookOpen,
      href: "/create/article",
    },
    {
      id: "video",
      title: "Video",
      description: "Upload a video or go live",
      icon: Video,
      href: "/create/video",
    },
  ];

  const handleSelect = (type: "post" | "article" | "video" ) => {
    setSelectedType(type);
    navigate(`/create/${type}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
          <DialogDescription>Choose what you'd like to create</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 py-4">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id as "post" | "article" | "video")}
                className=" cursor-pointer flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
