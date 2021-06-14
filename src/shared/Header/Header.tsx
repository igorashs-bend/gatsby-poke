import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem;
  height: 7rem;
  background-color: ${({ theme }) => theme.primaryColor};
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
