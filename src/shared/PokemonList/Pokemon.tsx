import React from 'react';
import { useDispatch } from 'react-redux';
import { pokemonAdded, pokemonRemoved } from 'redux/pokemonAction';
import styled from 'styled-components';
import { Pokemon } from 'types';
import Button from 'shared/Button';

const StyledPoke = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrimaryInfo = styled.p`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.dangerTextColor};

  span:first-child {
    font-weight: 700;
  }
`;

const SecondaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PokeImg = styled.img`
  width: 128px;
  height: 128px;
`;

const Stats = styled.p`
  display: flex;
  flex-direction: column;
`;

const PokemonItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const dispatch = useDispatch();

  const handleClick = (p: Pokemon) => {
    if (p.selected) {
      dispatch(pokemonRemoved(p.id));
    } else {
      dispatch(pokemonAdded(p.id));
    }
  };

  return (
    <StyledPoke>
      <PrimaryInfo>
        <span>{pokemon.name}</span> <span>{pokemon.national_number}</span>
      </PrimaryInfo>
      <SecondaryInfo>
        <PokeImg src={pokemon.sprites.normal} alt={pokemon.name} />
        <Stats>
          <span>HP: {pokemon.hp}</span>
          <span>AT: {pokemon.attack}</span>
          <span>DF: {pokemon.defense}</span>
          <span>SP: {pokemon.speed}</span>
          <span>SAT: {pokemon.sp_atk}</span>
          <span>SDF: {pokemon.sp_def}</span>
        </Stats>
      </SecondaryInfo>
      <Button onClick={() => handleClick(pokemon)} type="button">
        {pokemon.selected ? 'Unselect' : 'Select'}
      </Button>
    </StyledPoke>
  );
};

export default PokemonItem;
