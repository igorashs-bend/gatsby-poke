import React from 'react';
import { useDispatch } from 'react-redux';
import { pokemonRemoved } from 'redux/pokemonAction';
import styled from 'styled-components';
import { Pokemon } from 'types';
import Button from 'shared/Button';

const StyledPoke = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PokemonSmallItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(pokemonRemoved(pokemon.id));
  };

  return (
    <StyledPoke>
      <Button danger onClick={handleClick}>
        Remove
      </Button>
      <h4>{pokemon.name}</h4>
    </StyledPoke>
  );
};

export default PokemonSmallItem;
