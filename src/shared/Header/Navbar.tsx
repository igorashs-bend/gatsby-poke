import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledUl = styled.ul`
  display: flex;
  gap: 1.75rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentColor};
    font-weight: 500;
    font-size: ${({ theme }) => theme.h4FontSize};
  }

  a:hover {
    text-decoration: underline;
  }
`;

const links = [
  { path: '/', value: 'Home' },
  { path: '/my-pokemons', value: 'My Pokemons' },
  { path: '/charts', value: 'Charts' },
];

const Navbar = () => {
  return (
    <StyledUl>
      {links.map(({ path, value }) => (
        <li key={path}>
          <Link to={path}>{value}</Link>
        </li>
      ))}
    </StyledUl>
  );
};

export default Navbar;
