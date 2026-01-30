import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Based Skills",
  projectId: process.env.WALLETCONNECT_PROJECT_ID || "demo",
  chains: [base, baseSepolia],
  ssr: true,
});
