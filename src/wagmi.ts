import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [arbitrum, arbitrumSepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: process.env.WALLET_CONNECT_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [arbitrum.id]: http(),
      [arbitrumSepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
