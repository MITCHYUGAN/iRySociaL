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

const queryClient = new QueryClient();

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
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  </StrictMode>
);
