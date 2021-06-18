import React from 'react';
import { useDispatch } from 'react-redux';
import { pokemonRemoved } from 'redux/pokemonAction';
import styled from 'styled-components';
import { Pokemon } from 'types';
import Button from 'shared/Button';
import PokemonStatsRadar from 'shared/PokemonStatsRadar';

const StyledPoke = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PokemonSmallItem: React.FC<{ pokemon: Pokemon; onReady: () => void }> = ({
  pokemon,
  onReady,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(pokemonRemoved(pokemon.id));
  };

  return (
    <StyledPoke>
      <h4>{pokemon.name}</h4>
      <PokemonStatsRadar pokemon={pokemon} onReady={onReady} />
      <Button danger onClick={handleClick}>
        Remove
      </Button>
    </StyledPoke>
  );
};

export default PokemonSmallItem;
