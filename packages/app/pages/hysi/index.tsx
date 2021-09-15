import { Web3Provider } from '@ethersproject/providers';
import {
  AccountBatch,
  BatchType,
} from '@popcorn/contracts/adapters/HYSIBatchInteraction/HYSIBatchInteractionAdapter';
import { useWeb3React } from '@web3-react/core';
import BatchProcessingInfo from 'components/BatchHysi/BatchProcessingInfo';
import ClaimableBatches from 'components/BatchHysi/ClaimableBatches';
import MintRedeemInterface from 'components/BatchHysi/MintRedeemInterface';
import Navbar from 'components/NavBar/NavBar';
import { ContractsContext } from 'context/Web3/contracts';
import { BigNumber, Contract, utils } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  ComponentMap,
  HYSIBatchInteractionAdapter,
  TimeTillBatchProcessing,
} from '../../../contracts';

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
  const [withdrawal, setwithdrawal] = useState<Boolean>(false);
  const [wait, setWait] = useState<Boolean>(false);
  const [batchHysiAdapter, setBatchHysiAdapter] =
    useState<HYSIBatchInteractionAdapter>();
  const [batches, setBatches] = useState<AccountBatch[]>();
  const [timeTillBatchProcessing, setTimeTillBatchProcessing] =
    useState<TimeTillBatchProcessing[]>();

  useEffect(() => {
    if (!library || !contracts) {
      return;
    }
    setBatchHysiAdapter(new HYSIBatchInteractionAdapter(contracts.batchHysi));
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
    batchHysiAdapter
      .getHysiPrice(hysiDependencyContracts.basicIssuanceModule, {
        [hysiDependencyContracts.yDUSD.address.toLowerCase()]: {
          metaPool: hysiDependencyContracts.dusdMetapool,
          yPool: hysiDependencyContracts.yDUSD,
        },
        [hysiDependencyContracts.yFRAX.address.toLowerCase()]: {
          metaPool: hysiDependencyContracts.fraxMetapool,
          yPool: hysiDependencyContracts.yFRAX,
        },
        [hysiDependencyContracts.yUSDN.address.toLowerCase()]: {
          metaPool: hysiDependencyContracts.usdnMetapool,
          yPool: hysiDependencyContracts.yUSDN,
        },
        [hysiDependencyContracts.yUST.address.toLowerCase()]: {
          metaPool: hysiDependencyContracts.ustMetapool,
          yPool: hysiDependencyContracts.yUST,
        },
      } as ComponentMap)
      .then((res) => setHysiPrice(res));

    batchHysiAdapter
      .getThreeCrvPrice(hysiDependencyContracts.triPool)
      .then((res) => setThreeCrvPrice(res));
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
      const allowance = await contracts.threeCrv.allowance(
        account,
        contracts.batchHysi.address,
      );
      console.log('mint allowance', allowance.toString());
      if (allowance >= depositAmount) {
        toast.loading('Depositing 3CRV...');
        const res = await contracts.batchHysi
          .connect(library.getSigner())
          .depositForMint(depositAmount)
          .then((res) => {
            res.wait().then((res) => {
              toast.dismiss();
              toast.success('3CRV deposited!');
            });
          })
          .catch((err) => {
            toast.dismiss();
            if (err.data === undefined) {
              toast.error('An error occured');
            } else {
              toast.error(err.data.message.split("'")[1]);
            }
          });
      } else {
        approve(contracts.threeCrv);
      }
    } else {
      const allowance = await contracts.hysi.allowance(
        account,
        contracts.batchHysi.address,
      );
      console.log('redeem allowance', allowance.toString());
      if (allowance >= depositAmount) {
        toast.loading('Depositing HYSI...');
        await contracts.batchHysi
          .connect(library.getSigner())
          .depositForRedeem(depositAmount)
          .then((res) => {
            res.wait().then((res) => {
              toast.dismiss();
              toast.success('HYSI deposited!');
            });
          })
          .catch((err) => {
            toast.dismiss();
            if (err.data === undefined) {
              toast.error('An error occured');
            } else {
              toast.error(err.data.message.split("'")[1]);
            }
          });
      } else {
        approve(contracts.hysi);
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
        res.wait().then((res) => {
          toast.dismiss();
          toast.success('Batch claimed!');
        });
        batchHysiAdapter.getBatches(account).then((res) => setBatches(res));
      })
      .catch((err) => {
        toast.dismiss();
        if (err.data === undefined) {
          toast.error('An error occured');
        } else {
          toast.error(err.data.message.split("'")[1]);
        }
      });
  }

  async function approve(contract: Contract): Promise<void> {
    setWait(true);
    toast.loading('Approving Token...');
    await contract
      .connect(library.getSigner())
      .approve(contracts.batchHysi.address, utils.parseEther('100000000'))
      .then((res) => {
        res.wait().then((res) => {
          toast.dismiss();
          toast.success('Token approved!');
        });
      })
      .catch((err) => {
        toast.dismiss();
        if (err.data === undefined) {
          toast.error('An error occured');
        } else {
          toast.error(err.data.message.split("'")[1]);
        }
      });

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
              withdrawal={withdrawal}
              setwithdrawal={setwithdrawal}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              deposit={deposit}
              depositDisabled={
                withdrawal
                  ? depositAmount > hysiBalance && !wait
                  : depositAmount > threeCrvBalance && !wait
              }
            />
          )}
          <BatchProcessingInfo
            timeTillBatchProcessing={timeTillBatchProcessing}
          />
          {batches?.length > 0 && (
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
          )}
        </div>
      </main>
    </div>
  );
}
