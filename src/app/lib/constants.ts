import { Token } from "./definitions";

export const pitAddress = "0xBf084a0e34DbB74241f99b8a4ceeC10268494C9b";

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
