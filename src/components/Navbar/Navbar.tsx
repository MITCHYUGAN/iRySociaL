import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const Navbar = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="md:hidden"></SidebarTrigger>
        {children}
      </main>
      </SidebarProvider>
    </div>
  );
};

export default Navbar;
