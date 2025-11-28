import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, polygon, optimism, arbitrum, base, type Chain } from "wagmi/chains";

const irys: Chain = {
  id: 1270,
  name: "Irys Testnet",
  nativeCurrency: {
    name: "IRYS",
    symbol: "IRYS",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.irys.xyz/v1/execution-rpc"],
    },
  },
  blockExplorers: {
    default: { name: "Irys Explorer", url: "https://explorer.irys.xyz" },
  },
};

export const config = getDefaultConfig({
  appName: "iRySocial",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, polygon, optimism, arbitrum, base, irys],
});
