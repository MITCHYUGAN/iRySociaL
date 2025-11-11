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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "../../features/Dark_LightMode/mode-toggle";
import { useTheme } from "@/features/Dark_LightMode/theme-provider";

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

const moreitems = [
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

export function AppSidebar() {
  const { theme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <X className="md:hidden absolute right-5" onClick={() => toggleSidebar()} />
        <div className="flex flex-col items-start mt-5 gap-5">
          <div className="sidebar_logo">
            {theme === "light" ? <img className="w-50 " src="src/assets/irysocial_logo_dark.png" alt="" /> : <img className="w-50" src="src/assets/irysocial_logo.png" alt="" />}
          </div>
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
        <SidebarGroup>
          <Button className="button">
            {" "}
            <PlusCircle /> Create
          </Button>
        </SidebarGroup>
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
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
