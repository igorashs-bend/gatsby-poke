import { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Poke Charts',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        icon: './src/images/favicon.png',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-source-poke',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    'gatsby-plugin-root-import',
  ],
};

export default config;
