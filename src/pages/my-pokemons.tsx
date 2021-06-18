import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import PokemonSmallItem from 'shared/PokemonSmallItem';
import styled from 'styled-components';

const UL = styled.ul<{ hide: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;

  ${({ hide }) => hide && 'visibility: hidden;'}
`;

const MyPokemons = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);
  const [isLoading, setIsLoading] = useState(true);
  const loadedCount = useRef(0);

  const handleOnReady = () => {
    loadedCount.current += 1;

    if (loadedCount.current === selectedPokemons.length) setIsLoading(false);
  };

  return (
    <>
      {isLoading && !!selectedPokemons.length && <h5>loading...</h5>}

      <UL hide={isLoading}>
        {selectedPokemons.map((poke) => (
          <li key={poke.id}>
            <PokemonSmallItem pokemon={poke} onReady={handleOnReady} />
          </li>
        ))}
      </UL>
    </>
  );
};

export default MyPokemons;
