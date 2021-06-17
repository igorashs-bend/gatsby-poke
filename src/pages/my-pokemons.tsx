import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import Layout from 'shared/Layout';
import PokemonSmallItem from 'shared/PokemonSmallItem';
import styled from 'styled-components';

const UL = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
`;

const MyPokemons = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);

  return (
    <Layout>
      <UL>
        {selectedPokemons.map((poke) => (
          <li key={poke.id}>
            <PokemonSmallItem pokemon={poke} />
          </li>
        ))}
      </UL>
    </Layout>
  );
};

export default MyPokemons;
