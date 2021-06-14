import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  // colors
  bodyColor: '#f2f2f2',
  primaryColor: '#FFDE00',
  bodyTextColor: '#222',
  accentColor: '#3B4CCA',
  accentTextLightColor: '#fff',
  accentTextDarkColor: '#3B4CCA',
  dangerTextColor: '#f70000',

  // typography
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  fontFamily: 'Roboto sans-serif',
  bodyText: '16px',
  bodyLineHeight: 1.75,
  h1FontSize: '3.052rem',
  h2FontSize: '2.441rem',
  h3FontSize: '1.953rem',
  h4FontSize: '1.563rem',
  h5FontSize: '1.25rem',

  // breakpoints
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export default theme;
