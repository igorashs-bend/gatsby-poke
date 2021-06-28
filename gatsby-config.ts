import { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Poke Charts',
  },
  plugins: [
    // 'gatsby-plugin-root-import',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-source-poke',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Poke Charts',
        short_name: 'Poke Charts',
        start_url: '/pokemons',
        display: `standalone`,
        background_color: '#3B4CCA',
        icon: 'src/images/icon.png',
      },
    },
  ],
};

export default config;
