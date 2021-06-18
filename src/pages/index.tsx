import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.h3FontSize};
  font-weight: 700;
`;

const IndexPage = () => {
  return (
    <>
      <h1>Choose your pokemon</h1>
      <StyledLink to="/pokemons">Here</StyledLink>
    </>
  );
};

export default IndexPage;
