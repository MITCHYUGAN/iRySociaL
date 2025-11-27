import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
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
import ProfileCheck from "./features/Profile/onboarding/ProfileCheck.tsx";
import Profile from "./pages/Profile.tsx";
import CreatePostPage from "./features/CreatePost/CreatePostPage.tsx";
import CreateArticlePage from "./features/CreateArticle/CreateArticlePage.tsx";
import CreateVideoPage from "./features/CreateVideo/CreateVideoPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import Home from "./pages/Home.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <ProfileCheck />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      {
        element: <App />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/posts", element: <Posts /> },
          { path: "/articles", element: <Articles /> },
          { path: "/videos", element: <Videos /> },
          { path: "/profile/:username", element: <Profile /> },
        ],
      },
      { path: "/onboarding/profile", element: <CreateProfile /> },
      { path: "/create/post", element: <CreatePostPage /> },
      { path: "/create/article", element: <CreateArticlePage /> },
      { path: "/create/video", element: <CreateVideoPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WagmiProvider config={config}>
        <SidebarProvider>
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
        </SidebarProvider>
      </WagmiProvider>
    </ThemeProvider>
  </StrictMode>
);
