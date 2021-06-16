import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { Pokemon } from 'types';
import styled, { useTheme } from 'styled-components';

am4core.useTheme(am4themes_animated);

const StyledChart = styled.div`
  min-height: 320px;
`;

const PokemonStatsRadar: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const theme = useTheme();
  const chartRef = useRef<am4charts.RadarChart>();

  useEffect(() => {
    const chart = am4core.create(
      `chart-stats-${pokemon.id}`,
      am4charts.RadarChart,
    );

    const { hp, attack, speed, defense, sp_atk, sp_def } = pokemon;

    chart.data = [
      { stat: 'HP', value: hp },
      { stat: 'ATK', value: attack },
      { stat: 'DEF', value: defense },
      { stat: 'SPD', value: speed },
      { stat: 'SPATK', value: sp_atk },
      { stat: 'SPDEF', value: sp_def },
    ];

    // create axes
    const categoryAxis = chart.xAxes.push(
      new am4charts.CategoryAxis<am4charts.AxisRendererCircular>(),
    );
    categoryAxis.dataFields.category = 'stat';
    categoryAxis.tooltip!.disabled = true;

    const valueAxis = chart.yAxes.push(
      new am4charts.ValueAxis<am4charts.AxisRendererRadial>(),
    );

    valueAxis.renderer.gridType = 'polygons';

    const avgSeries = chart.series.push(new am4charts.RadarSeries());
    avgSeries.name = 'average';
    avgSeries.dataFields.valueY = 'value';
    avgSeries.dataFields.categoryX = 'stat';
    const avg = (hp + attack + speed + defense + sp_atk + sp_def) / 6;
    avgSeries.data = [
      { stat: 'HP', value: avg },
      { stat: 'ATK', value: avg },
      { stat: 'DEF', value: avg },
      { stat: 'SPD', value: avg },
      { stat: 'SPATK', value: avg },
      { stat: 'SPDEF', value: avg },
    ];
    avgSeries.fill = am4core.color(`${theme.primaryColor}`);
    avgSeries.stroke = am4core.color(`${theme.primaryColor}`);
    avgSeries.fillOpacity = 0.5;
    avgSeries.strokeOpacity = 0.5;
    avgSeries.tooltipText = 'avg {valueY}';

    const series = chart.series.push(new am4charts.RadarSeries());
    series.name = 'stats';
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'stat';
    series.strokeWidth = 3;
    series.tooltipText = '{categoryX} {valueY}';
    series.fillOpacity = 0.6;
    series.strokeOpacity = 0.6;
    series.fill = am4core.color(`${theme.accentColor}`);
    series.stroke = am4core.color(`${theme.accentTextDarkColor}`);
    series.bullets.push(new am4charts.CircleBullet());

    chart.legend = new am4charts.Legend();

    chart.cursor = new am4charts.RadarCursor();

    return () => chartRef.current?.dispose();
  }, [pokemon, theme, pokemon.id]);

  return <StyledChart id={`chart-stats-${pokemon.id}`} />;
};

export default PokemonStatsRadar;
