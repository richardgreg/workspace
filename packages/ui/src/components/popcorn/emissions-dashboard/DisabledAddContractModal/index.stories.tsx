// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { DisabledAddContractModal } from './index';

export default {
  title: 'Emissions Dashboard / Components / Disabled Add Contract Modal',
  component: DisabledAddContractModal,
} as Meta;

const Template: Story = (args) => <DisabledAddContractModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  setOpen: () => {},
};
