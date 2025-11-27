import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createBrowserRouter, Link, Navigate, RouterProvider } from "react-router-dom";
import CreateProfile from "./features/Profile/onboarding/CreateProfile.tsx";
import Posts from "./pages/Post.tsx";
import Articles from "./pages/Articles.tsx";
import Videos from "./pages/Videos.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import TrendingBar from "./components/Trending/TrendingBar.tsx";
import ProfileCheck from "./features/Profile/onboarding/ProfileCheck.tsx";
import Profile from "./pages/Profile.tsx";
import CreatePostPage from "./features/CreatePost/CreatePostPage.tsx";
import CreateArticlePage from "./features/CreateArticle/CreateArticlePage.tsx";
import CreateVideoPage from "./features/CreateVideo/CreateVideoPage.tsx";
import { ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button.tsx";
import { UserProvider } from "./context/UserContext.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <ProfileCheck />,
    errorElement: (
      <>
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Oops Wrong Page</h2>
            <p className="text-gray-400 mb-6 font-display-inter">The page you're trying to access doesn't exist.</p>
            <Link to={"/"}>
              <Button variant="ghost" className="text-main hover:text-main/80 font-display-inter cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" /> Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </>
    ),
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <App /> },
      {
        path: "/posts",
        element: (
          <div className="flex flex-col justify-evenly md:gap-10 md:flex-row w-full">
            <SidebarProvider className="w-[50%]">
              {/* <SidebarProvider className="w-[400px]"> */}
              <Navbar />
            </SidebarProvider>
            <Posts />
            <TrendingBar />
          </div>
        ),
      },
      {
        path: "/articles",
        element: (
          <div className="flex flex-col justify-evenly md:gap-10 md:flex-row w-full">
            <SidebarProvider className="w-[50%]">
              {/* <SidebarProvider className="w-[400px]"> */}
              <Navbar />
            </SidebarProvider>
            <Articles />
            <TrendingBar />
          </div>
        ),
      },
      {
        path: "/videos",
        element: (
          <div className="flex flex-col justify-evenly md:gap-10 md:flex-row w-full">
            <SidebarProvider className="w-[50%]">
              {/* <SidebarProvider className="w-[400px]"> */}
              <Navbar />
            </SidebarProvider>
            <Videos />
            <TrendingBar />
          </div>
        ),
      },
      { path: "/onboarding/profile", element: <CreateProfile /> },
      {
        path: "/profile/:username",
        element: (
          <div className="flex flex-col justify-evenly md:gap-10 md:flex-row w-full">
            <SidebarProvider className=" w-[400px] lg:w-[400px]">
              <Navbar />
            </SidebarProvider>
            <Profile />
            {/* <TrendingBar /> */}
          </div>
        ),
      },

      {
        path: "/create/post",
        element: <CreatePostPage />,
      },

      {
        path: "/create/article",
        element: <CreateArticlePage />,
      },
      {
        path: "/create/video",
        element: <CreateVideoPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "oklch(0.9019 0.152 173.5161)",
              accentColorForeground: "black",
              borderRadius: "small",
            })}
          >
            <UserProvider>
              <RouterProvider router={router} />
            </UserProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  </StrictMode>
);
