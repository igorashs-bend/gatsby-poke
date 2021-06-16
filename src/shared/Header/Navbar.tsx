import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledUl = styled.ul`
  display: flex;
  gap: 1.75rem;
  flex-wrap: wrap;

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
  { path: '/my-pokemons', value: 'My Pokemons' },
  { path: '/charts', value: 'Charts' },
];

const Navbar = () => {
  return (
    <StyledUl>
      {links.map(({ path, value }) => (
        <li key={path}>
          <Link to={path} activeStyle={{ textDecoration: 'underline' }}>
            {value}
          </Link>
        </li>
      ))}
    </StyledUl>
  );
};

export default Navbar;
