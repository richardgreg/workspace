export const getDummyEmissionData = () => {
  return new Array(20).fill(undefined).map((x, i) => {
    return {
      date: `${i}/05/2021`,
      co2Emissions:
        Math.random() > 0.5
          ? Math.floor(100000 * Math.random())
          : Math.floor(10 * Math.random()),
      numTransactions: Math.floor(1000 * Math.random()),
      averageGasPrice: 10,
      date: new Date().toDateString(),
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
