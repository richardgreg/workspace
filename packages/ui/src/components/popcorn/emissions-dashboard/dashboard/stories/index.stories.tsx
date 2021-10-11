import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
import React from 'react';
import { ContractContainer } from '../../ContractContainer';
import { DateRangePicker } from '../../DateRangePicker';
import { Divider } from '../../Divider';
import { getDummyTxns } from '../../dummyTxns';
import { NavBar } from '../../NavBar';

const updateDates = (startDate: Date, endDate: Date): void => {};
const EmissionsDashboardPage = () => {
  const startDate = new Date(DateTime.now().minus({ months: 1 }).toISO());
  const previousPeriodStartDate = new Date(
    DateTime.now().minus({ months: 2 }).toISO(),
  );
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <DateRangePicker
        updateDates={updateDates}
        endDate={new Date()}
        startDate={new Date(DateTime.now().minus({ months: 1 }).toISO())}
      />
      <ContractContainer
        readyState={'done'}
        transactionsCurrentPeriod={getDummyTxns(startDate)}
        transactionsPreviousPeriod={getDummyTxns(previousPeriodStartDate)}
        endDate={new Date()}
        startDate={startDate}
        previousPeriodStartDate={previousPeriodStartDate}
        isTotal={true}
      />
      <Divider />
      {new Array(4).fill(undefined).map((x) => {
        return (
          <ContractContainer
            readyState={'done'}
            transactionsCurrentPeriod={getDummyTxns(startDate)}
            transactionsPreviousPeriod={getDummyTxns(previousPeriodStartDate)}
            endDate={new Date()}
            startDate={startDate}
            previousPeriodStartDate={previousPeriodStartDate}
            contract={{ name: 'POP', address: '0x' }}
          />
        );
      })}
    </div>
  );
};

export default {
  title: 'Emissions Dashboard / Dashboard / StackedLayout',
  component: EmissionsDashboardPage,
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <NavBar
          title="Smart Contract Emissions Dashboard"
          logo="./popcorn-logo.png"
          contractProps={{
            open: false,
            setOpen: () => {},
            addContract: () => {},
          }}
          contractErrorProps={{
            errorMessage: '',
            setErrorMessage: () => {},
            openAddContractModal: () => {},
          }}
          refresh={() => {}}
        />
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <EmissionsDashboardPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  contractProps: {
    open: false,
    setOpen: () => {},
    addContract: () => {},
  },
  contractErrorProps: {
    errorMessage: 'Fatal error, run your life',
    setErrorMessage: () => {},
    openAddContractModal: () => {},
  },
};
