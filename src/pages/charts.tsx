import React from 'react';
import AvgComparisonChart from 'shared/AvgComparisonChart';
import styled from 'styled-components';
import BubbleStatCharts from 'shared/BubbleStatCharts';

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const charts = () => {
  return (
    <UL>
      <li>
        <AvgComparisonChart />
      </li>
      <li>
        <BubbleStatCharts />
      </li>
    </UL>
  );
};

export default charts;
