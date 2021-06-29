import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  selectPokemonList,
  selectPokemonSelectedList,
} from 'redux-store/pokemonReducer';
import { Pokemon } from 'types';
import PokemonItem from 'shared/PokemonItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3.5rem;
`;

const StyledAutoComplete = styled(AutoComplete)`
  max-width: 512px;

  input {
    font-size: 1.5rem;
  }

  .ant-input-group-addon button {
    width: 3.25rem;
    height: 3.25rem;
  }
`;

const PokeContainer = styled.div`
  width: 320px;
`;

const filterElements = (
  data: { name: string }[],
  search: string,
  size: number = 3,
) => {
  const foundElements = data.filter((d) => d.name.match(RegExp(search, 'i')));
  const elements = [];

  const length = size > foundElements.length ? foundElements.length : size;

  for (let i = 0; i < length; i += 1) {
    elements.push({ value: foundElements[i].name });
  }

  return elements;
};

const FindPoke = () => {
  const pokemonList = useSelector(selectPokemonList);
  const selectedPokemons = useSelector(selectPokemonSelectedList);
  const [options, setOptions] = useState<{ value: string }[]>();
  const [foundPokemon, setFoundPokemon] = useState<Pokemon>();

  const onSearch = (searchText: string) => {
    setOptions(!searchText ? [] : filterElements(pokemonList, searchText, 5));
  };

  const onSelect = (data: string) => {
    setFoundPokemon(
      pokemonList.find((p) => p.name.toLowerCase() === data.toLowerCase()),
    );
  };

  return (
    <Container>
      <StyledAutoComplete
        options={options}
        autoFocus
        size="large"
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search
          placeholder="find your pokemon"
          size="large"
          onPressEnter={(e) => onSelect(e.currentTarget.value)}
        />
      </StyledAutoComplete>

      {foundPokemon && (
        <PokeContainer>
          <PokemonItem
            pokemon={foundPokemon}
            selected={!!selectedPokemons.find((p) => p.id === foundPokemon.id)}
          />
        </PokeContainer>
      )}
    </Container>
  );
};

export default FindPoke;
