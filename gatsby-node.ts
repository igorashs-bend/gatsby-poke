import { GatsbyNode } from 'gatsby';
import path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

interface GraphQlRes {
  allPokemons: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const res = await graphql<GraphQlRes>(`
    query {
      allPokemons {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  if (!res.data) throw new Error('in createPages, res.data is undefined');

  const { edges } = res.data.allPokemons;

  const pokemonsPerPage = 12;
  const numPages = Math.ceil(edges.length / pokemonsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/pokemons' : `/pokemons/${i + 1}`,
      component: path.resolve('src/templates/pokemon-list.tsx'),
      context: {
        limit: pokemonsPerPage,
        skip: i * pokemonsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
