import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider";
import Home from "./pages/Home";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Videos from "./pages/Videos";
import Posts from "./pages/Post";
import Articles from "./pages/Articles";
import TrendingBar from "./components/Trending/TrendingBar";
import { SidebarProvider } from "./components/ui/sidebar";

const router = createBrowserRouter([
  {
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/articles", element: <Articles /> },
      { path: "/videos", element: <Videos /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col md:flex-row w-full">
        <SidebarProvider className="w-[1000px]">
          <Navbar />
        </SidebarProvider>
        <RouterProvider router={router} />
          <TrendingBar />
      </div>
    </ThemeProvider>
  );
}

export default App;
