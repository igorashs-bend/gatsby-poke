import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Button from 'shared/Button';

const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Pagination: React.FC<{
  base: string;
  numPages: number;
  currentPage: number;
}> = ({ base, numPages, currentPage }) => {
  return (
    <UL>
      {Array.from({ length: numPages }).map((_, i) => (
        <li key={`${base}/${i + new Date().getTime()}`}>
          <Link to={`${base}/${i === 0 ? '' : i + 1}`}>
            <Button disabled={currentPage === i + 1}>{i + 1}</Button>
          </Link>
        </li>
      ))}
    </UL>
  );
};

export default Pagination;
