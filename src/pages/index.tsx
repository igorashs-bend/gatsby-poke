import * as React from 'react';
import PokemonList from 'shared/PokemonList';
import Layout from 'shared/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Choose your pokemon</h1>
      <PokemonList />
    </Layout>
  );
};

export default IndexPage;
