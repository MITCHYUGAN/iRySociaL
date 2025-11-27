import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bell, Bookmark, ChevronUp, Home, Mail, MessageSquare, Newspaper, PlusCircle, Search, Settings, User2, Video, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Button } from "../ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { ModeToggle } from "../../features/Dark_LightMode/mode-toggle";
import { useTheme } from "@/features/Dark_LightMode/theme-provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import logoDark from "@/assets/irysocial_logo_dark.png";
import logoLight from "@/assets/irysocial_logo.png";
import CreateModal from "../modal/CreateModal";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

const browseitems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: MessageSquare,
  },
  {
    title: "Articles",
    url: "/articles",
    icon: Newspaper,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: Video,
  },
];

export function AppSidebar() {
  const {
    profile,
    // isLoading
  } = useUser();
  const { theme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const margin = address ? "0px" : "100px";
  // const [username, setUsername] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const username = profile?.username || "";

  console.log("Profile", profile);

  const moreitems = [
    {
      title: "Profile",
      url: `/profile/${username}`,
      icon: User2,
    },
    {
      title: "Bookmarks",
      url: "#",
      icon: Bookmark,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
    {
      title: "Messages",
      url: "#",
      icon: Mail,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="w-[300px]">
      <SidebarHeader>
        <X className="md:hidden absolute right-5" onClick={() => toggleSidebar()} />
        <div className="flex flex-col items-start mt-5 gap-5">
          <a href="/home">
            <div className="sidebar_logo">{theme === "light" ? <img className="w-50 " src={logoDark} alt="" /> : <img className="w-50" src={logoLight} alt="" />}</div>
          </a>
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {browseitems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {address && (
          <SidebarGroup>
            <SidebarGroupLabel>More</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {moreitems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {address && (
          <SidebarGroup>
            <Button className="button" onClick={() => setOpenCreateModal(true)}>
              {" "}
              <PlusCircle /> Create
            </Button>

            <CreateModal open={openCreateModal} onOpenChange={setOpenCreateModal} />
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center justify-center">
        <div className={`flex items-center gap-3 mb-[${margin}] `}>
          {address ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 /> {username || "loading..."}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <Button className="cursor-pointer" variant={"destructive"} onClick={() => disconnect()}>
                        Sign out
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <ConnectButton />
          )}
          {/* <ModeToggle /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
