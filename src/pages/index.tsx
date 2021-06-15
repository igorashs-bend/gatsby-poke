import * as React from 'react';
import Layout from 'shared/Layout';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.h3FontSize};
  font-weight: 700;
`;

const IndexPage = () => {
  return (
    <Layout>
      <h1>Choose your pokemon</h1>
      <StyledLink to="/pokemons">Here</StyledLink>
    </Layout>
  );
};

export default IndexPage;
