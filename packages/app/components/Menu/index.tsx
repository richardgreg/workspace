import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { MobileExpandableMenu } from 'components/MobileExpandableMenu';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  /* transform: ${({ open }) =>
  open ? 'translateX(0)' : 'translateX(200%)'}; */
  /* transition: transform 0.9s; */
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  animation: fade_in_show 0.3s;

  @keyframes fade_in_show {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

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
