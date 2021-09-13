import { Web3Provider } from '@ethersproject/providers';
import { formatAndRoundBigNumber } from '@popcorn/utils';
import { useWeb3React } from '@web3-react/core';
import Navbar from 'components/NavBar/NavBar';
import { ContractsContext } from 'context/Web3/contracts';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useContext, useEffect, useState } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { BatchHysiAdapter } from '../../../contracts';
import { Batch } from '../../../contracts/adapters/BatchHysi/BatchHysiAdapter';

enum BatchType {
  Mint,
  Redeem,
}

interface TimeTillBatchProcessing {
  timeTillProcessing: Date;
  progressPercentage: number;
}

async function calcBatchTimes(
  batchHysiAdapter: BatchHysiAdapter,
  library: Web3Provider,
): Promise<TimeTillBatchProcessing[]> {
  const cooldowns = await batchHysiAdapter.getBatchCooldowns();
  const currentBlockTime = await (await library.getBlock('latest')).timestamp;
  const secondsTillMint = new Date(
    (currentBlockTime / Number(cooldowns[0].toString())) * 1000,
  );
  const secondsTillRedeem = new Date(
    (currentBlockTime / Number(cooldowns[1].toString())) * 1000,
  );
  const percentageTillMint = currentBlockTime / Number(cooldowns[0].toString());
  const percentageTillRedeem =
    (currentBlockTime / Number(cooldowns[1].toString())) * 100;
  return [
    {
      timeTillProcessing: secondsTillMint,
      progressPercentage: percentageTillMint,
    },
    {
      timeTillProcessing: secondsTillRedeem,
      progressPercentage: percentageTillRedeem,
    },
  ];
}

export default function BatchHysi(): JSX.Element {
  const context = useWeb3React<Web3Provider>();
  const { library, account, activate } = context;
  const { contracts, hysiDependencyContracts } = useContext(ContractsContext);
  const [hysiBalance, setHysiBalance] = useState<BigNumber>();
  const [threeCrvBalance, setThreeCrvBalance] = useState<BigNumber>();
  const [hysiPrice, setHysiPrice] = useState<BigNumber>();
  const [threeCrvPrice, setThreeCrvPrice] = useState<BigNumber>();
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
    calcBatchTimes(batchHysiAdapter, library).then((res) =>
      setTimeTillBatchProcessing(res),
    );
  }, [batchHysiAdapter]);

  return (
    <div>
      <Navbar />
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
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="flex flex-row">
              <div className="w-1/2 bg-primaryLight rounded-lg px-5 py-6">
                <img
                  src="/images/treeRow.svg"
                  alt="treeRow"
                  className="mx-auto mb-4"
                ></img>
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h2 className="font-semibold text-base text-gray-900 mb-4">
                    Your connected Wallet
                  </h2>
                  <div className="flex flex-row w-full items-center">
                    <div className="w-5/12">
                      <p className="font-semibold text-sm text-gray-700 mb-1">
                        HYSI Balance
                      </p>
                      <div className="rounded-md bg-gray-50 border border-gray-200 p-2">
                        <div className="flex flex-row justify-between">
                          <p>
                            {hysiBalance
                              ? formatAndRoundBigNumber(hysiBalance)
                              : '-'}
                          </p>
                          <p className="text-gray-700">Token</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/12">
                      <div className="flex mt-5 mx-auto w-10 h-10 rounded-full border border-gray-200 items-center">
                        <img
                          src="/images/waveEqual.svg"
                          alt="waveEqual"
                          className="mx-auto "
                        ></img>
                      </div>
                    </div>
                    <div className="w-5/12">
                      <p className="font-semibold text-sm text-gray-700 mb-1">
                        USD Balance
                      </p>
                      <div className="rounded-md bg-gray-50 border border-gray-200 p-2">
                        <div className="flex flex-row justify-between">
                          <p>
                            {hysiPrice && hysiBalance
                              ? formatAndRoundBigNumber(
                                  hysiBalance
                                    .mul(hysiPrice)
                                    .div(parseEther('1')),
                                )
                              : '-'}
                          </p>
                          <p className="text-gray-700">USD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-6 py-6">
                <div className="flex flex-row">
                  <div className="w-1/2 border-b-2 border-gray-900">
                    <p className="text-center font-semibold text-base text-gray-900 mb-4">
                      Deposit
                    </p>
                  </div>
                  <div className="w-1/2 border-b border-gray-400 cursor-pointer group hover:border-gray-600">
                    <p className="text-center font-semibold text-base text-gray-400 mb-4 group-hover:text-gray-600">
                      Withdraw
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    Deposit Amount
                  </p>
                  <div className="rounded-md border border-gray-200 px-2 py-3">
                    <div className="flex flex-row justify-between items-center">
                      <input className="w-96" placeholder="-" />
                      <div className="flex flex-row items-center">
                        <p className="text-gray-400 mr-3 border border-gray-400 p-1 rounded cursor-pointer hover:bg-gray-50 hover:border-gray-500 hover:text-gray-600">
                          MAX
                        </p>
                        <p className="text-gray-700">3CRV</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center my-8">
                    <div className="w-16 bg-white">
                      <div className="flex mx-auto w-10 h-10 rounded-full border border-gray-200 items-center cursor-pointer hover:bg-gray-50 hover:border-gray-400">
                        <img
                          src="/images/exchangeIcon.svg"
                          alt="exchangeIcon"
                          className="mx-auto p-3"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    Estimated Hysi Amount
                  </p>
                  <div className="rounded-md border border-gray-200 px-2 py-4">
                    <div className="flex flex-row justify-between">
                      <input className="w-96" placeholder="-" />
                      <p className="text-gray-700">Token</p>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center mt-10">
                  <button className="bg-blue-600 px-12 py-3 text-white rounded-xl hover:bg-blue-700">
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 mt-16 flex flex-row">
            <div className="w-2/3 flex flex-row">
              <div className="w-24 h-24 flex-shrink-0 flex-grow-0 mr-4">
                {timeTillBatchProcessing && (
                  <CircularProgressbar
                    percentage={timeTillBatchProcessing[0].progressPercentage}
                    initialAnimation={true}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        stroke: `rgba(62, 152, 199, ${60 / 100})`,
                        strokeLinecap: 'butt',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                      },
                      trail: {
                        stroke: '#d6d6d6',
                      },
                    }}
                  />
                )}
              </div>
              <div>
                {timeTillBatchProcessing && (
                  <h2 className="font-semibold text-base text-gray-900 mb-2">
                    {`${timeTillBatchProcessing[0].timeTillProcessing.getUTCHours()} Hours
                  ${timeTillBatchProcessing[0].timeTillProcessing.getUTCMinutes()} Minutes
                  ${timeTillBatchProcessing[0].timeTillProcessing.getUTCSeconds()} Seconds left`}
                  </h2>
                )}
                <p>
                  We reduce your gas fee/transaction with doing deposit in
                  batch. This batch will automatically submitted after reach our
                  schedule. When the batch is completed you can claim the HYSI
                  token to be displayed on your wallet
                </p>
              </div>
            </div>
            <div className="w-1/3 flex justify-end">
              <button className="px-3 h-12 rounded-lg font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700">
                See History
              </button>
            </div>
          </div>
          <div className="mt-16">
            <h2></h2>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Deposited Token
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Claimable Token
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {batches?.map((batch, id) => (
                          <tr
                            key={`"${batch.batchType}-${id}"`}
                            className={id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {`${batch.deposited} ${
                                batch.batchType === BatchType.Mint
                                  ? '3CRV'
                                  : 'HYSI'
                              }`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {`${batch.claimableToken} ${
                                batch.batchType === BatchType.Mint
                                  ? 'HYSI'
                                  : '3CRV'
                              }`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {batch.claimable ? 'Claimable' : 'Not Claimable'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-900"
                              >
                                Claim
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
