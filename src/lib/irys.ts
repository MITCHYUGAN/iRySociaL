import { ethers } from "ethers";
import { WebUploader } from "@irys/web-upload";
import { WebEthereum } from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";

export const getIrysUploader = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("No Ethereum provider found. Please install and Eth wallet like (MetaMask).");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const rpcUrl = "https://ethereum-sepolia-rpc.publicnode.com";
  const uploader = await WebUploader(WebEthereum).withAdapter(EthersV6Adapter(provider)).withRpc(rpcUrl).devnet();
  return uploader;
};