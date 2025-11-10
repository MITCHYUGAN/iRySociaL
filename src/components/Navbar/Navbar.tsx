import { AppSidebar } from "./app-sidebar";
import { useSidebar } from "../ui/sidebar";
import { Menu } from "lucide-react";

const Navbar = ({children} : {children?: React.ReactNode}) => {
  const { toggleSidebar } = useSidebar()

  return (
    <div>
      <AppSidebar />
      <main>
        <Menu className="md:hidden m-6" onClick={() => toggleSidebar()}/>
        {children}
      </main>
    </div>
  );
};

export default Navbar;
