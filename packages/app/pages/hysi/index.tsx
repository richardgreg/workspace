import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import BatchProcessingInfo from 'components/BatchHysi/BatchProcessingInfo';
import ClaimableBatches from 'components/BatchHysi/ClaimableBatches';
import MintRedeemInterface from 'components/BatchHysi/MintRedeemInterface';
import Navbar from 'components/NavBar/NavBar';
import { ContractsContext } from 'context/Web3/contracts';
import { BigNumber, utils } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BatchHysiAdapter } from '../../../contracts';
import {
  Batch,
  BatchType,
  TimeTillBatchProcessing,
} from '../../../contracts/adapters/BatchHysi/BatchHysiAdapter';

export default function BatchHysi(): JSX.Element {
  const context = useWeb3React<Web3Provider>();
  const { library, account, activate } = context;
  const { contracts, hysiDependencyContracts } = useContext(ContractsContext);
  const [hysiBalance, setHysiBalance] = useState<BigNumber>();
  const [threeCrvBalance, setThreeCrvBalance] = useState<BigNumber>();
  const [hysiPrice, setHysiPrice] = useState<BigNumber>();
  const [threeCrvPrice, setThreeCrvPrice] = useState<BigNumber>();
  const [depositAmount, setDepositAmount] = useState<BigNumber>(
    BigNumber.from('0'),
  );
  const [withdrawl, setWithdrawl] = useState<Boolean>(false);
  const [wait, setWait] = useState<Boolean>(false);
  const [batchHysiAdapter, setBatchHysiAdapter] = useState<BatchHysiAdapter>();
  const [batches, setBatches] = useState<Batch[]>();
  const [timeTillBatchProcessing, setTimeTillBatchProcessing] =
    useState<TimeTillBatchProcessing[]>();

  useEffect(() => {
    if (!library || !contracts) {
      return;
    }
    setBatchHysiAdapter(
      new BatchHysiAdapter(
        contracts.batchHysi,
        hysiDependencyContracts.basicIssuanceModule,
        hysiDependencyContracts.yDUSD,
        hysiDependencyContracts.yFRAX,
        hysiDependencyContracts.yUSDN,
        hysiDependencyContracts.yUST,
        hysiDependencyContracts.dusdMetapool,
        hysiDependencyContracts.fraxMetapool,
        hysiDependencyContracts.usdnMetapool,
        hysiDependencyContracts.ustMetapool,
        hysiDependencyContracts.triPool,
      ),
    );
    if (account) {
      contracts.hysi.balanceOf(account).then((res) => setHysiBalance(res));
      contracts.threeCrv
        .balanceOf(account)
        .then((res) => setThreeCrvBalance(res));
    }
  }, [library, account]);

  useEffect(() => {
    if (!batchHysiAdapter) {
      return;
    }
    batchHysiAdapter.getHysiPrice().then((res) => setHysiPrice(res));
    batchHysiAdapter.getThreeCrvPrice().then((res) => setThreeCrvPrice(res));
    batchHysiAdapter.getBatches(account).then((res) => setBatches(res));
    batchHysiAdapter
      .calcBatchTimes(library)
      .then((res) => setTimeTillBatchProcessing(res));
  }, [batchHysiAdapter]);

  async function deposit(
    depositAmount: BigNumber,
    batchType: BatchType,
  ): Promise<void> {
    setWait(true);
    if (batchType === BatchType.Mint) {
      const approved =
        (await contracts.threeCrv.allowance(
          account,
          contracts.batchHysi.address,
        )) >= depositAmount;
      if (approved) {
        toast.loading('Depositing 3CRV...');
        await contracts.batchHysi
          .connect(library.getSigner())
          .depositForMint(depositAmount)
          .then((res) => {
            toast.success('3CRV deposited!');
          })
          .catch((err) => {
            toast.error(err.data.message.split("'")[1]);
          });
      } else {
        toast.loading('Approving 3CRV...');
        await contracts.threeCrv
          .connect(library.getSigner())
          .approve(process.env.ADDR_STAKING, utils.parseEther('100000000'))
          .then((res) => toast.success('3CRV approved!'))
          .catch((err) => toast.error(err.data.message.split("'")[1]));
        setWait(false);
      }
    } else {
      const approved =
        (await contracts.hysi.allowance(
          account,
          contracts.batchHysi.address,
        )) >= depositAmount;
      if (approved) {
        toast.loading('Depositing HYSI...');
        await contracts.batchHysi
          .connect(library.getSigner())
          .depositForRedeem(depositAmount)
          .then((res) => {
            toast.success('HYSI deposited!');
          })
          .catch((err) => {
            toast.error(err.data.message.split("'")[1]);
          });
      } else {
        toast.loading('Approving HYSI...');
        await contracts.hysi
          .connect(library.getSigner())
          .approve(process.env.ADDR_STAKING, utils.parseEther('100000000'))
          .then((res) => toast.success('HYSI approved!'))
          .catch((err) => toast.error(err.data.message.split("'")[1]));
        setWait(false);
      }
    }
    setWait(false);
  }

  async function claim(batchId: string): Promise<void> {
    toast.loading('Claiming Batch...');
    await contracts.batchHysi
      .connect(library.getSigner())
      .claim(batchId)
      .then((res) => {
        toast.success('Batch claimed!');
      })
      .catch((err) => {
        toast.error(err.data.message.split("'")[1]);
      });
  }

  async function approve(): Promise<void> {
    setWait(true);
    toast.loading('Approving POP for staking...');

    const lockedPopInEth = utils.parseEther('100000000');
    const connected = await contracts.pop.connect(library.getSigner());
    await connected
      .approve(process.env.ADDR_STAKING, lockedPopInEth)
      .then((res) => toast.success('POP approved!'))
      .catch((err) => toast.error(err.data.message.split("'")[1]));
    setWait(false);
  }

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              Popcorn Yield Optimizer
            </h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {batchHysiAdapter && (
            <MintRedeemInterface
              threeCrvBalance={threeCrvBalance}
              threeCrvPrice={threeCrvPrice}
              hysiBalance={hysiBalance}
              hysiPrice={hysiPrice}
              withdrawl={withdrawl}
              setWithdrawl={setWithdrawl}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              deposit={deposit}
              depositDisabled={
                withdrawl
                  ? depositAmount > hysiBalance && !wait
                  : depositAmount > threeCrvBalance && !wait
              }
            />
          )}
          <BatchProcessingInfo
            timeTillBatchProcessing={timeTillBatchProcessing}
          />
          <div className="mt-16">
            <h2></h2>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <ClaimableBatches batches={batches} claim={claim} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
