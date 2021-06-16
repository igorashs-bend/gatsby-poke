import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import Layout from 'shared/Layout';
import PokemonSmallItem from 'shared/PokemonSmallItem';
import styled from 'styled-components';

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const MyPokemons = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);

  return (
    <Layout>
      <h1>My Pokemons</h1>
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
