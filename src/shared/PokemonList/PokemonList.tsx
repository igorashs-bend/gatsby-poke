import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonReset } from 'redux/pokemonAction';
import { selectPokemonList } from 'redux/pokemonReducer';
import styled from 'styled-components';
import Button from 'shared/Button';
import PokemonItem from '../PokemonItem';

const UL = styled.ul`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  gap: 2rem;
`;

const PokemonList = () => {
  const pokemons = useSelector(selectPokemonList);
  const dispatch = useDispatch();

  return (
    <>
      <p>Pokemon List</p>
      <Button danger onClick={() => dispatch(pokemonReset())} type="button">
        Reset
      </Button>
      <UL>
        {pokemons.length &&
          pokemons.map((p) => (
            <li key={p.id}>
              <PokemonItem pokemon={p} />
            </li>
          ))}
      </UL>
    </>
  );
};

export default PokemonList;
