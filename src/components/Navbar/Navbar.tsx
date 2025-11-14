import { AppSidebar } from "./app-sidebar";
import { useSidebar } from "../ui/sidebar";
// import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/features/Dark_LightMode/theme-provider";

const Navbar = ({ children }: { children?: React.ReactNode }) => {
  const { toggleSidebar } = useSidebar();
    const { theme } = useTheme();

  return (
    <div className="">
      <AppSidebar />
      <main className="flex gap-5 items-center">
        <Avatar className="w-[50px] h-[50px] self-start md:hidden my-6 mr-6 cursor-pointer" onClick={() => toggleSidebar()}>
          <AvatarImage className="w-full" src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>🥷</AvatarFallback>
        </Avatar>
      <div className="sidebar_logo md:hidden self-center">
        {theme === "light" ? <img className="w-50 " src="src/assets/irysocial_logo_dark.png" alt="" /> : <img className="w-50" src="src/assets/irysocial_logo.png" alt="" />}
      </div>
        {children}
      </main>
    </div>
  );
};

export default Navbar;
