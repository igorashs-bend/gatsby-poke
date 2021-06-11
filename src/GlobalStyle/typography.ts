import { css } from 'styled-components';

const typography = css`
  html {
    font-size: ${({ theme }) => theme.bodyText};
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    line-height: ${({ theme }) => theme.bodyLineHeight};
    font-weight: 400;
    color: ${({ theme }) => theme.bodyTextColor};
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
    font-size: 1rem;
  }

  a {
    color: ${({ theme }) => theme.accentTextDarkColor};
  }

  h1 {
    font-size: ${({ theme }) => theme.h1FontSize};
  }

  h2 {
    font-size: ${({ theme }) => theme.h2FontSize};
  }

  h3 {
    font-size: ${({ theme }) => theme.h3FontSize};
  }

  h4 {
    font-size: ${({ theme }) => theme.h4FontSize};
  }

  h5 {
    font-size: ${({ theme }) => theme.h5FontSize};
  }
`;

export default typography;
