import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { MobileExpandableMenu } from 'components/MobileExpandableMenu';

export const StyledMenu = styled.nav`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(200%)')};
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.9s;
  z-index: 1;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <MobileExpandableMenu toggleMenuVisible={open} />
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
