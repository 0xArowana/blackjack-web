import { http, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia, mainnet } from "viem/chains";

export const config = createConfig({
    chains: [arbitrum, arbitrumSepolia],
    transports: {
        [arbitrum.id]: http(),
        [arbitrumSepolia.id]: http(),
    }
})