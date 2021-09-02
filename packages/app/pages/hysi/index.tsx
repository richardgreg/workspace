import { Web3Provider } from '@ethersproject/providers';
import { formatAndRoundBigNumber } from '@popcorn/utils';
import { useWeb3React } from '@web3-react/core';
import Navbar from 'components/NavBar/NavBar';
import { ContractsContext } from 'context/Web3/contracts';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { BatchHysiAdapter } from '../../../contracts';

export default function BatchHysi(): JSX.Element {
  const context = useWeb3React<Web3Provider>();
  const { library, account, activate } = context;
  const { contracts, hysiDependencyContracts } = useContext(ContractsContext);
  const [hysiBalance, setHysiBalance] = useState<BigNumber>();
  const [threeCrvBalance, setThreeCrvBalance] = useState<BigNumber>();
  const [hysiPrice, setHysiPrice] = useState<BigNumber>();
  const [threeCrvPrice, setThreeCrvPrice] = useState<BigNumber>();
  const [batchHysiAdapter, setBatchHysiAdapter] = useState<BatchHysiAdapter>();

  useEffect(() => {
    if (!library) {
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
  }, [batchHysiAdapter]);

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      role: 'Admin',
      email: 'jane.cooper@example.com',
    },
    {
      name: 'Cody Fisher',
      title: 'Product Directives Officer',
      role: 'Owner',
      email: 'cody.fisher@example.com',
    },
  ];

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
          <div className="bg-white rounded-lg shadow px-5 py-6 mt-16">
            <div></div>
            <div>
              <p>
                We reduce your gas fee/transaction with doing deposit in batch.
                This batch will automatically submitted after reach our
                schedule. When the batch is completed you can claim the HYSI
                token to be displayed on your wallet
              </p>
            </div>
            <div></div>
          </div>
          <div>
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
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {people.map((person, personIdx) => (
                          <tr
                            key={person.email}
                            className={
                              personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {person.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {person.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {person.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {person.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
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
