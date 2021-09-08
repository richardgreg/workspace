export const getDummyEmissionData = () => {
  return new Array(20).fill(undefined).map((x, i) => {
    return {
      date: `${i}/05/2021`,
      co2Emissions: Math.floor(500 * Math.random()),
      numTransactions: Math.floor(500 * Math.random()),
      averageGasPrice: 10,
      blockStartDate: new Date().toDateString(),
      endBlock: 100000,
      startBlock: 10000,
      gasUsed: 10000,
    };
  });
};

export const getEmptyChartData = () => {
  return new Array(20).fill(undefined).map((x, i) => {
    return {
      date: `${i}/05/2021`,
    };
  });
};
