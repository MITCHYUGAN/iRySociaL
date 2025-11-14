import { Search, TrendingUp } from "lucide-react";
import { Input } from "../ui/input";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/sidebar";

const browseitems = [
  {
    title: "#WebDevelopment",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "#WebDesign",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "#Irys",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "#IrysNft",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "#IrysSocials",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "#IrysBlogerr",
    url: "#",
    icon: TrendingUp,
  },
];

// const moreitems = [
//   {
//     title: "Bookmarks",
//     url: "#",
//     icon: Bookmark,
//   },
//   {
//     title: "Notifications",
//     url: "#",
//     icon: Bell,
//   },
//   {
//     title: "Messages",
//     url: "#",
//     icon: Mail,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

const TrendingBar = () => {
  return (
    <SidebarProvider className="hidden xl:flex w-[1000px]">
      <Sidebar side="right">
        <SidebarHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search everything..." className="pl-9 bg-secondary border-border" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Trending Now</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {browseitems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="text-primary" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* <SidebarGroup>
            <SidebarGroupLabel>More</SidebarGroupLabel>
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
          </SidebarGroup> */}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default TrendingBar;
