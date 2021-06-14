import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../shared/Layout';

export const query = graphql`
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
`;

interface IndexPageProps extends PageProps {
  data: {
    allPokemons: {
      edges: {
        node: {
          name: string;
          id: string;
          national_number: string;
          sp_atk: number;
          sp_def: number;
          speed: number;
          attack: number;
          hp: number;
          defense: number;
          sprites: {
            normal: string;
          };
        };
      }[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const pokes = data.allPokemons.edges;

  return (
    <Layout>
      <h1>Pokemons total {pokes.length}</h1>
      <ul>
        {pokes.map(({ node }) => (
          <li key={node.id}>
            <p>{node.name}</p>
            <img src={node.sprites.normal} alt={node.name} />
            <code>
              hp | {node.hp}
              attack | {node.attack}
              defense | {node.defense}
              speed | {node.speed}
            </code>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
