import { BigNumber, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";

export class BatchHysiAdapter {
  constructor(
    private batchHysi: Contract,
    private basicIssuanceModule: Contract,
    private yDUSD: Contract,
    private yFRAX: Contract,
    private yUSDN: Contract,
    private yUST: Contract,
    private dusdMetapool: Contract,
    private fraxMetapool: Contract,
    private usdnMetapool: Contract,
    private ustMetapool: Contract,
    private triPool: Contract
  ) {}

  componentMap = {
    [process.env.ADDR_YDUSD]: {
      metaPool: this.dusdMetapool,
      yPool: this.yDUSD,
    },
    [process.env.ADDR_FRAX]: {
      metaPool: this.fraxMetapool,
      yPool: this.yFRAX,
    },
    [process.env.ADDR_YUSDN]: {
      metaPool: this.usdnMetapool,
      yPool: this.yUSDN,
    },
    [process.env.ADDR_YUST]: {
      metaPool: this.ustMetapool,
      yPool: this.yUST,
    },
  };

  public async getHysiPrice(): Promise<BigNumber> {
    const components =
      await this.basicIssuanceModule.getRequiredComponentUnitsForIssue(
        process.env.ADDR_HYSI,
        parseEther("1")
      );
    const componentAddresses = components[0];
    const componentAmounts = components[1];

    const componentVirtualPrices = await Promise.all(
      componentAddresses.map(async (component) => {
        const metapool = this.componentMap[component.toLowerCase()].metaPool;
        const yPool = this.componentMap[component.toLowerCase()].yPool;
        const yPoolPricePerShare = await yPool.pricePerShare();
        const metapoolPrice = await metapool.get_virtual_price();
        return yPoolPricePerShare
          .mul(metapoolPrice)
          .div(parseEther("1")) as BigNumber;
      })
    );

    const hysiPrice = componentVirtualPrices.reduce(
      (sum: BigNumber, componentPrice: BigNumber, i) => {
        return sum.add(
          componentPrice.mul(componentAmounts[i]).div(parseEther("1"))
        );
      },
      parseEther("0")
    );

    return hysiPrice as BigNumber;
  }

  public async getThreeCrvPrice(): Promise<BigNumber> {
    return await this.triPool.virtualPrice();
  }
}
export default BatchHysiAdapter;
