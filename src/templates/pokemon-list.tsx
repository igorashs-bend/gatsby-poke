import React from 'react';
import Layout from 'shared/Layout';
import { graphql } from 'gatsby';
import { QueryData } from 'types';
import styled from 'styled-components';
import PokemonItem from 'shared/PokemonItem';
import Pagination from 'shared/Pagination';

export interface DataProps {
  data: {
    allPokemons: {
      edges: {
        node: QueryData;
      }[];
    };
  };

  pageContext: {
    limit: 12;
    skip: 216;
    numPages: 72;
    currentPage: 19;
  };
}

const UL = styled.ul`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
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
  return (
    <Layout>
      <UL>
        {data.allPokemons.edges.map(({ node }) => (
          <li key={node.id}>
            <PokemonItem pokemon={node} />
          </li>
        ))}
      </UL>
      <Pagination base="/pokemons" numPages={pageContext.numPages} />
    </Layout>
  );
};

export default PokemonList;
