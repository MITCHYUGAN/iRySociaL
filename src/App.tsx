import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider";
import Home from "./pages/Home";
import TrendingBar from "./components/Trending/TrendingBar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col md:flex-row w-full">
        <SidebarProvider className="w-[40%]">
          <Navbar />
        </SidebarProvider>
        <Home />
        <TrendingBar />
      </div>
    </ThemeProvider>
  );
}

export default App;
