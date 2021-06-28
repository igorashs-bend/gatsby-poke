import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux-store/pokemonReducer';
import styled from 'styled-components';
import BubbleStatChart from './BubbleStatChart';

const UL = styled.ul`
  display: grid;
  grid-auto-rows: 560px;
  gap: 3.5rem;

  li div {
    height: 100%;
  }
`;

const BubbleStatCharts = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);

  return !selectedPokemons.length ? null : (
    <UL>
      <li>
        <BubbleStatChart
          chartId="hp-bubble"
          data={selectedPokemons.map((p) => ({
            name: p.name,
            value: p.hp,
          }))}
          titleText="HP stats"
          options={{
            name: 'hp',
            color: am4core.color('#76b67088'),
          }}
        />
      </li>
      <li>
        <BubbleStatChart
          chartId="sp-bubble"
          data={selectedPokemons.map((p) => ({
            name: p.name,
            value: p.speed,
          }))}
          titleText="SP stats"
          options={{
            name: 'sp',
            color: am4core.color('#3cafbe7c'),
          }}
        />
      </li>
      <li>
        <BubbleStatChart
          chartId="at-bubble"
          data={selectedPokemons.map((p) => ({
            name: p.name,
            value: p.speed,
          }))}
          titleText="AT stats"
          options={{
            name: 'at',
            color: am4core.color('#be3c3c7b'),
          }}
        />
      </li>
      <li>
        <BubbleStatChart
          chartId="def-bubble"
          data={selectedPokemons.map((p) => ({
            name: p.name,
            value: p.speed,
          }))}
          titleText="DEF stats"
          options={{
            name: 'def',
            color: am4core.color('#816f5379'),
          }}
        />
      </li>
    </UL>
  );
};

export default BubbleStatCharts;
