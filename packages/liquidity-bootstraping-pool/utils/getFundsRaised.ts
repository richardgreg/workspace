import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { ethers } from 'ethers';
import balancerAbi from './balancerAbi.json';

async function getFundsRaised(): Promise<BigNumber> {
  const INITIAL_AMOUNT = parseUnits('562500', 6);
  const MAINNET_ADDRESS = '0xba12222222228d8ba445958a75a0704d566bf2c8';
  const POLYGON_ADDRESS = '0xba12222222228d8ba445958a75a0704d566bf2c8';
  const MAINNET_POOL_ID =
    '0xc79b9b75cd0e9567a000eeb8f6e46b3d074ac38c0002000000000000000000d2';
  const POLYGON_POOL_ID =
    '0x6d68d7b0ca469bd1171f81a895e649d86d523c2000020000000000000000009c';

  const amountPolygon = (
    await getPoolTokens('polygon-mainnet', POLYGON_ADDRESS, POLYGON_POOL_ID)
  ).sub(INITIAL_AMOUNT);
  const amountMainnet = (
    await getPoolTokens('mainnet', MAINNET_ADDRESS, MAINNET_POOL_ID)
  ).sub(INITIAL_AMOUNT);
  return amountPolygon.add(amountMainnet);
}

async function getPoolTokens(network, address, poolId): Promise<BigNumber> {
  const mainnetProvider = new ethers.providers.JsonRpcProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  );
  const contract = new ethers.Contract(address, balancerAbi, mainnetProvider);
  const [tokens, balances] = await contract.getPoolTokens(poolId);
  return balances[0];
}

export default getFundsRaised;
