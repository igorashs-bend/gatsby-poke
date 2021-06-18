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

const PokemonStatsRadar: React.FC<{ pokemon: Pokemon; onReady: () => void }> =
  ({ pokemon, onReady }) => {
    const theme = useTheme();
    const chartRef = useRef<am4charts.RadarChart>();

    useEffect(() => {
      const chart = am4core.create(
        `chart-stats-${pokemon.id}`,
        am4charts.RadarChart,
      );

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = 'left';

      chart.events.on('ready', onReady);

      const { hp, attack, speed, defense, sp_atk, sp_def } = pokemon;

      chart.data = [
        { stat: 'HP', value: hp },
        { stat: 'ATK', value: attack },
        { stat: 'DEF', value: defense },
        { stat: 'SPD', value: speed },
        { stat: 'SPATK', value: sp_atk },
        { stat: 'SPDEF', value: sp_def },
      ];

      // category axis
      const categoryAxis = chart.xAxes.push(
        new am4charts.CategoryAxis<am4charts.AxisRendererCircular>(),
      );
      categoryAxis.dataFields.category = 'stat';
      categoryAxis.tooltip!.disabled = true;
      categoryAxis.renderer.grid.template.strokeWidth = 5;
      categoryAxis.renderer.labels.template.fontWeight = 'bold';

      // value axis
      const valueAxis = chart.yAxes.push(
        new am4charts.ValueAxis<am4charts.AxisRendererRadial>(),
      );

      valueAxis.renderer.grid.template.stroke = am4core.color('#006f77');
      valueAxis.renderer.grid.template.strokeWidth = 5;
      valueAxis.renderer.labels.template.fontWeight = 'bold';
      valueAxis.zIndex = 3;
      valueAxis.renderer.gridType = 'polygons';

      // average series
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
      avgSeries.adapter.add('tooltipText', (text, target) => {
        if (target.dataItem) return `- ${text} -`;

        return text;
      });
      avgSeries.showOnInit = false;

      // stats series
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

      const circleBullets = series.bullets.push(new am4charts.CircleBullet());
      circleBullets.events.on('hit', (e) => {
        const dataItem = e.target.dataItem as am4charts.RadarSeriesDataItem;

        // eslint-disable-next-line no-alert
        alert(`clicked on:  ${dataItem.categoryX} ${dataItem.valueY}`);
      });
      series.showOnInit = false;

      circleBullets.stroke = am4core.color('#54a1df');
      series.heatRules.push({
        target: circleBullets,
        property: 'fill',
        min: am4core.color('#00a116'),
        max: am4core.color('#b9ffc3'),
        dataField: 'valueY',
        logarithmic: true,
      });

      chart.legend = new am4charts.Legend();

      chart.cursor = new am4charts.RadarCursor();

      chartRef.current = chart;

      return () => chartRef.current?.dispose();
    }, [pokemon, theme, pokemon.id]);

    return <StyledChart id={`chart-stats-${pokemon.id}`} />;
  };

export default PokemonStatsRadar;
