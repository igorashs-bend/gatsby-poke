import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonAdded } from 'redux/pokemonAction';
import { selectPokemonList } from 'redux/pokemonReducer';

const PokemonList = () => {
  const pokemons = useSelector(selectPokemonList);
  const dispatch = useDispatch();

  return (
    <>
      <p>Pokemon List</p>
      <ul>
        {pokemons.length &&
          pokemons.map((p) => (
            <li key={p.id}>
              <p>Name: {p.name}</p>
              <p>nr: {p.national_number}</p>
              <button
                onClick={() => dispatch(pokemonAdded(p.id))}
                type="button"
              >
                Select
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PokemonList;
