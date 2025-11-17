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
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import CreateProfile from "./features/Profile/onboarding/CreateProfile.tsx";
import Posts from "./pages/Post.tsx";
import Articles from "./pages/Articles.tsx";
import Videos from "./pages/Videos.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import TrendingBar from "./components/Trending/TrendingBar.tsx";
import ProfileCheck from "./features/Profile/onboarding/ProfileCheck.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <ProfileCheck />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <App /> },
      {
        path: "/posts",
        element: (
          <div className="flex flex-col md:flex-row w-full">
            <SidebarProvider className="w-[40%]">
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
          <div className="flex flex-col md:flex-row w-full">
            <SidebarProvider className="w-[40%]">
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
          <div className="flex flex-col md:flex-row w-full">
            <SidebarProvider className="w-[40%]">
              <Navbar />
            </SidebarProvider>
            <Videos />
            <TrendingBar />
          </div>
        ),
      },
      { path: "/onboarding/profile", element: <CreateProfile /> },
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
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  </StrictMode>
);
