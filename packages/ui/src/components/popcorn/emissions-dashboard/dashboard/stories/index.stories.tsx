import { CloudIcon, TrendingUpIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ContractContainer } from '../../ContractContainer';
import { DateRangePicker } from '../../DateRangePicker';
import { Divider } from '../../Divider';
import { getDummyEmissionData } from '../../dummyEmissionsData';
import { Contract, StatCardData } from '../../interfaces';
import { NavBar } from '../../NavBar';
import { TotalStats } from '../../TotalStats';

const statCardData: StatCardData[] = [
  {
    id: 1,
    name: 'CO2 Emissions (µg)',
    stat: 71,
    icon: CloudIcon,
    change: '12.38%',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Transactions',
    stat: 23,
    icon: TrendingUpIcon,
    change: '5.4%',
    changeType: 'increase',
  },
];

const contract: Contract = {
  name: 'Popcorn HYSI Staking Pool',
  address: '0xd0cd466b34a24fcb2f87676278af2005ca8a78c4',
};

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const updateDates = (startDate: Date, endDate: Date): void => {};

const EmissionsDashboardPage = () => {
  return (
    <div className="bg-gray-50">
      <DateRangePicker
        updateDates={updateDates}
        startDate={new Date()}
        endDate={new Date()}
      />
      <TotalStats
        statCardData={statCardData}
        startDate={new Date()}
        data={getDummyEmissionData()}
      />
      <Divider />
      {new Array(4).fill(undefined).map((x) => {
        return (
          <ContractContainer
            statCardData={statCardData}
            contract={contract}
            data={getDummyEmissionData()}
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
      <>
        <NavBar
          title="Smart Contract Emissions Dashboard"
          headerNavigation={navigation}
          userNavigation={userNavigation}
          user={user}
          logo="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          contractProps={{
            open: false,
            setOpen: () => {},
            addContract: () => {},
          }}
          contractErrorProps={{
            errorMessage: 'Fatal error, run your life',
            setErrorMessage: () => {},
            openAddContractModal: () => {},
          }}
        />
        <Story />
      </>
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
