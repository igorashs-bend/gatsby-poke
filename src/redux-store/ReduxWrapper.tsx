import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { graphql, StaticQuery } from 'gatsby';
import { QueryData } from 'types';
import store from './store';
import { pokemonUploaded } from './pokemonAction';

export interface DataProps {
  allPokemons: {
    edges: {
      node: QueryData;
    }[];
  };
}

const ReduxWrapper: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allPokemons {
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
      `}
      render={(data: DataProps) => {
        // works on web browser only
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          store.dispatch(
            pokemonUploaded(
              data.allPokemons.edges.map(({ node }) => ({
                ...node,
                selected: false,
              })),
            ),
          );
        }, [data.allPokemons.edges]);

        return <Provider store={store}>{element}</Provider>;
      }}
    />
  );
};

export default ReduxWrapper;
