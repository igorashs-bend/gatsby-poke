import React from 'react';
import { graphql, navigate } from 'gatsby';
import { QueryData } from 'types';
import styled from 'styled-components';
import PokemonItem from 'shared/PokemonItem';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux-store/pokemonReducer';
import { Pagination } from 'antd';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

export interface DataProps {
  data: {
    allPokemons: {
      edges: {
        node: QueryData;
      }[];
    };
  };

  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
}

const UL = styled.ul`
  display: grid;
  padding-bottom: 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 2rem;
`;

export const query = graphql`
  query ($limit: Int!, $skip: Int!) {
    allPokemons(limit: $limit, skip: $skip) {
      edges {
        node {
          name
          id
          national_number
          sp_atk
          sp_def
          speed
          attack
          hp
          defense
          sprites {
            normal
          }
        }
      }
    }
  }
`;

const PokemonList: React.FC<DataProps> = ({ data, pageContext }) => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);

  return (
    <>
      <UL>
        {data.allPokemons.edges.map(({ node }) => (
          <li key={node.id}>
            <PokemonItem
              pokemon={node}
              selected={!!selectedPokemons.find(({ id }) => id === node.id)}
            />
          </li>
        ))}
      </UL>

      <StyledPagination
        current={pageContext.currentPage}
        total={pageContext.numPages}
        pageSize={1}
        onChange={(page) => navigate(`/pokemons/${page === 1 ? '' : page}`)}
        simple
      />
    </>
  );
};

export default PokemonList;
