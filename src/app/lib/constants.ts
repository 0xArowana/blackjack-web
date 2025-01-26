import { Token } from "./definitions";

export const pitAddress = "0x6b228FEafBF3fC0F181962Df8026BEd13c0A08cD";

export const tokens: { [key: string]: Token } = {
  USDC: {
    address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
    precision: 6,
  },
  USDT: {
    address: "0x30fA2FbE15c1EaDfbEF28C188b7B8dbd3c1Ff2eB",
    precision: 18,
  },
};
