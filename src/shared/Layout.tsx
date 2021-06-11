import React from 'react';
import GlobalStyle from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import Header from './Header';

// todo Responsive Container | Mobile First
const Container = styled.div``;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
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
