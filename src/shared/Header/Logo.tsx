import React from 'react';
import styled from 'styled-components';
import logo from './logo.png';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;

  img {
    width: 3.5rem;
    height: 3.5rem;
  }
  span {
    font-size: ${({ theme }) => theme.h4FontSize};
    text-decoration: underline;
  }
`;

const Red = styled.span`
  color: ${({ theme }) => theme.dangerTextColor};
`;

const Logo = () => {
  return (
    <StyledLogo>
      <img src={logo} alt="Poke Charts Logo" />
      <span>
        <Red>Poke</Red>Charts
      </span>
    </StyledLogo>
  );
};

export default Logo;
