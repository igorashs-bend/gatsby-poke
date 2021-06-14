import React from 'react';
import GlobalStyle from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { Helmet } from 'react-helmet';
import Header from './Header';

// todo Responsive Container | Mobile First
const Container = styled.div``;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <main>
          <Header />
          <Container>{children}</Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
