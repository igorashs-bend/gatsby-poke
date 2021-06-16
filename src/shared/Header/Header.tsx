import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem;
  min-height: 7rem;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 0px 0px 5px 1px #333;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Logo />
        <Navbar />
      </StyledHeader>
    </>
  );
};

export default Header;
