import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const Chart = () => {
  const selectedPokemons = useSelector(selectPokemonSelectedList);
  const chartRef = useRef<am4charts.XYChart>();

  useEffect(() => {
    const chart = am4core.create('pokechart', am4charts.XYChart);
    chart.paddingRight = 20;

    const data = selectedPokemons.map((poke) => ({
      name: poke.name,
      hp: poke.hp,
    }));

    chart.data = data;
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.title.text = 'Pokemons';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Hp';
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.minWidth = 25;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'hp';
    series.dataFields.categoryX = 'name';
    series.columns.template.stroke = am4core.color('#76b670');
    series.columns.template.fill = am4core.color('#43803e');
    series.strokeWidth = 3;
    series.tooltipText = 'Hp: {hp}';

    chart.cursor = new am4charts.XYCursor();

    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    const scrollBarX = new am4charts.XYChartScrollbar();

    chart.scrollbarX = scrollBarX;

    chartRef.current = chart;
    return () => chartRef.current?.dispose();
  }, [selectedPokemons]);

  return !selectedPokemons.length ? null : (
    <div id="pokechart" style={{ height: '360px' }} />
  );
};

export default Chart;
