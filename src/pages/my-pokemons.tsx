import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import Layout from 'shared/Layout';

const MyPokemons = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);

  return (
    <Layout>
      <h1>My Pokemons</h1>
      <ul>
        {selectedPokemons.map((poke) => (
          <li key={poke.id}>
            <p>Name: {poke.name}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default MyPokemons;
