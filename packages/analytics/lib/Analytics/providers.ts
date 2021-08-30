import { ethers } from "ethers";
export const providers = [
  new ethers.providers.JsonRpcProvider({
    url: process.env.RPC_URL,
  }),
  new ethers.providers.JsonRpcProvider({
    url: process.env.RPC_URL_2,
  }),
];
