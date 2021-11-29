import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const Injected = new InjectedConnector({
  supportedChainIds: [
    1, 4, 42, 69, 31337, 1337, 137, 43113, 43114, 250, 56, 97, 100, 200, 42161,
    421611, 10,
  ],
});

const Network = new NetworkConnector({
  urls: {
    [+process.env.CHAIN_ID]: process.env.RPC_URL,
  },
  defaultChainId: +process.env.CHAIN_ID,
});

export const connectors = { Injected, Network };
