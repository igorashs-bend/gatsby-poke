import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Pagination: React.FC<{ base: string; numPages: number }> = ({
  base,
  numPages,
}) => {
  return (
    <UL>
      {Array.from({ length: numPages }).map((_, i) => (
        <li key={`${base}/${i + new Date().getTime()}`}>
          <Link to={`${base}/${i === 0 ? '' : i + 1}`}>Page {i + 1}</Link>
        </li>
      ))}
    </UL>
  );
};

export default Pagination;
