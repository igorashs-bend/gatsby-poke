import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import logo from './logo.png';

const StyledLogo = styled.div`
  flex-shrink: 0;
  font-weight: 700;

  a {
    display: flex;
    align-items: center;
  }

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
      <Link to="/pokemons">
        <img src={logo} alt="Poke Charts Logo" />
        <span>
          <Red>Poke</Red>Charts
        </span>
      </Link>
    </StyledLogo>
  );
};

export default Logo;
