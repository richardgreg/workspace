import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { Network } from "hardhat/types";
import { ComponentMap } from "../adapters/HYSIBatchInteraction/HYSIBatchInteractionAdapter";
import deployContracts, { Contracts } from "../test/utils/deployContracts";
import { CurveMetapool, MockYearnV2Vault } from "../typechain";
const fs = require("fs");

async function getHysiBalanceInUSD(
  hysiBalance: BigNumber,
  componentMap: ComponentMap,
  contracts: Contracts
): Promise<BigNumber> {
  const components =
    await contracts.basicIssuanceModule.getRequiredComponentUnitsForIssue(
      contracts.setToken.address,
      hysiBalance
    );
  const componentAddresses = components[0];
  const componentAmounts = components[1];

  const componentVirtualPrices = await Promise.all(
    componentAddresses.map(async (component) => {
      const metapool = componentMap[component.toLowerCase()]
        .metaPool as CurveMetapool;
      const yPool = componentMap[component.toLowerCase()]
        .yPool as MockYearnV2Vault;
      const yPoolPricePerShare = await yPool.pricePerShare();
      const metapoolPrice = await metapool.get_virtual_price();
      return yPoolPricePerShare.mul(metapoolPrice).div(parseEther("1"));
    })
  );

  const componentValuesInUSD = componentVirtualPrices.reduce(
    (sum, componentPrice, i) => {
      return sum.add(
        componentPrice.mul(componentAmounts[i]).div(parseEther("1"))
      );
    },
    parseEther("0")
  );
  return componentValuesInUSD;
}

export default async function simulateSlippage(
  ethers,
  network: Network
): Promise<void> {
  const MAX_SLIPPAGE = 0.005;
  const INPUT_AMOUNT = parseEther("1000000");

  let resetBlockNumber = 12780990;
  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.FORKING_RPC_URL,
          blockNumber: resetBlockNumber,
        },
      },
    ],
  });
  const [signer] = await ethers.getSigners();

  const contracts = await deployContracts(ethers, network, signer);
  const componentMap: ComponentMap = {
    [contracts.yDUSD.address]: {
      name: "yDUSD",
      metaPool: contracts.dusdMetapool,
      yPool: contracts.yDUSD,
    },
    [contracts.yFRAX.address]: {
      name: "yFRAX",
      metaPool: contracts.fraxMetapool,
      yPool: contracts.yFRAX,
    },
    [contracts.yUSDN.address]: {
      name: "yUSDN",
      metaPool: contracts.usdnMetapool,
      yPool: contracts.yUSDN,
    },
    [contracts.yUST.address]: {
      name: "yUST",
      metaPool: contracts.ustMetapool,
      yPool: contracts.yUST,
    },
  };
  await contracts.faucet.sendThreeCrv(100000, signer.address);
  console.log("transfer 1");
  await contracts.threeCrv
    .connect(signer)
    .transfer(contracts.hysiBatchInteraction.address, parseEther("1"));

  console.log("transfer 2");
  await contracts.threeCrv
    .connect(signer)
    .transfer(contracts.hysiBatchInteraction.address, 0);

  console.log("three 1");
  await contracts.threeCrv
    .connect(signer)
    .approve(contracts.hysiBatchInteraction.address, INPUT_AMOUNT);

  console.log("hysi 1");
  await contracts.hysi
    .connect(signer)
    .approve(contracts.hysiBatchInteraction.address, INPUT_AMOUNT);

  console.log(
    await (
      await contracts.threeCrv.allowance(
        signer.address,
        contracts.hysiBatchInteraction.address
      )
    ).toString()
  );

  console.log("three 2");
  await contracts.threeCrv
    .connect(signer)
    .approve(contracts.hysiBatchInteraction.address, INPUT_AMOUNT);

  console.log("hysi 2");
  await contracts.hysi
    .connect(signer)
    .approve(contracts.hysiBatchInteraction.address, INPUT_AMOUNT);

  console.log("dusd 1");
  await contracts.crvDUSD
    .connect(signer)
    .approve(contracts.dusdMetapool.address, INPUT_AMOUNT.mul(10));

  console.log("dusd 2");
  await contracts.crvDUSD
    .connect(signer)
    .approve(contracts.dusdMetapool.address, INPUT_AMOUNT.mul(10));

  console.log("frax 1");
  await contracts.crvFRAX
    .connect(signer)
    .approve(contracts.fraxMetapool.address, INPUT_AMOUNT.mul(10));

  console.log("frax 2");
  await contracts.crvFRAX
    .connect(signer)
    .approve(contracts.fraxMetapool.address, INPUT_AMOUNT.mul(10));

  // for (let i = 0; i < 20; i++) {
  //   const threeCrvPrice = await contracts.threePool.get_virtual_price();
  //   const inputAmountInUSD = INPUT_AMOUNT.mul(threeCrvPrice).div(
  //     parseEther("1")
  //   );
  //   await contracts.hysiBatchInteraction
  //     .connect(signer)
  //     .depositForMint(INPUT_AMOUNT, signer.address);
  //   const mintBatchId =
  //     await contracts.hysiBatchInteraction.currentMintBatchId();
  //   await contracts.hysiBatchInteraction.connect(signer).batchMint(0);
  //   const mintBlockNumber = await (
  //     await ethers.provider.getBlock("latest")
  //   ).number;

  //   const hysiBalance = await (
  //     await contracts.hysiBatchInteraction.batches(mintBatchId)
  //   ).claimableTokenBalance;

  //   const hysiAmountInUSD = await getHysiBalanceInUSD(
  //     hysiBalance,
  //     componentMap,
  //     contracts
  //   );
  //   const slippage =
  //     bigNumberToNumber(
  //       inputAmountInUSD.mul(parseEther("1")).div(hysiAmountInUSD)
  //     ) - 1;
  //   fs.appendFileSync(
  //     "slippage.csv",
  //     `\r\n${mintBlockNumber},${INPUT_AMOUNT.toString()},${inputAmountInUSD.toString()},${hysiBalance.toString()},${hysiAmountInUSD.toString()},${slippage},${
  //       slippage <= MAX_SLIPPAGE
  //     }`
  //   );
  //   console.log(
  //     `At block: ${mintBlockNumber}, inputAmount ${INPUT_AMOUNT.toString()} 3CRV => ${inputAmountInUSD.toString()} USD, outputAmount: ${hysiBalance.toString()} => ${hysiAmountInUSD.toString()} USD, slippage: ${slippage} is accepable ${
  //       slippage <= MAX_SLIPPAGE
  //     }`
  //   );
  //   console.log(
  //     "-----------------------------------------------------------------------------"
  //   );

  //   await contracts.hysiBatchInteraction
  //     .connect(signer)
  //     .claim(mintBatchId, signer.address);
  //   console.log("claim done");
  //   await contracts.hysiBatchInteraction.depositForRedeem(hysiBalance);
  //   console.log("deposit done");
  //   const redeemId =
  //     await contracts.hysiBatchInteraction.currentRedeemBatchId();
  //   console.log("redeem id done");
  //   console.log(
  //     "dusd",
  //     await (
  //       await contracts.threeCrv.balanceOf(contracts.dusdMetapool.address)
  //     ).toString()
  //   );
  //   console.log(
  //     "frax",
  //     await (
  //       await contracts.threeCrv.balanceOf(contracts.fraxMetapool.address)
  //     ).toString()
  //   );
  //   console.log(
  //     "usdn",
  //     await (
  //       await contracts.threeCrv.balanceOf(contracts.usdnMetapool.address)
  //     ).toString()
  //   );
  //   console.log(
  //     "ust",
  //     await (
  //       await contracts.threeCrv.balanceOf(contracts.ustMetapool.address)
  //     ).toString()
  //   );
  //   console.log(
  //     "hysi",
  //     await (
  //       await contracts.hysi.balanceOf(contracts.hysiBatchInteraction.address)
  //     ).toString()
  //   );
  //   await contracts.hysiBatchInteraction
  //     .connect(signer)
  //     .batchRedeem(0, { gasLimit: 9000000 });
  //   console.log("redeemed done");
  //   await contracts.hysiBatchInteraction
  //     .connect(signer)
  //     .claim(redeemId, signer.address);
  //   console.log("claim2 done");
  // }
}
