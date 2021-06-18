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

    const nameData = selectedPokemons.map((poke) => ({
      name: poke.name,
    }));
    chart.data = nameData;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = 'left';

    // categoryAxis
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.title.text = 'Pokemons';
    categoryAxis.renderer.grid.template.location = 0;

    // valueAxis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Values';
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.minWidth = 10;

    const valueBreak = valueAxis.axisBreaks.create();
    valueBreak.startValue = 60;
    valueBreak.endValue = 100;
    valueBreak.breakSize = 0.1;

    valueBreak.events.on('over', () => {
      valueBreak.breakSize = 1;
      valueBreak.opacity = 0.1;
    });

    valueBreak.events.on('out', () => {
      valueBreak.breakSize = 0.1;
      valueBreak.opacity = 1;
    });

    // hp
    chart.series.push(
      createColumnSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          hp: poke.hp,
        })),
        options: {
          name: 'HP',
          categoryX: 'name',
          valueY: 'hp',
          tooltipText: 'HP {hp}',
          minColor: am4core.color('#76b67088'),
          maxColor: am4core.color('#07550087'),
        },
      }),
    );

    // sp
    chart.series.push(
      createColumnSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          sp: poke.speed,
        })),
        options: {
          name: 'SP',
          categoryX: 'name',
          valueY: 'sp',
          tooltipText: 'SP: {sp}',
          minColor: am4core.color('#3cafbe7c'),
          maxColor: am4core.color('#003941a9'),
        },
      }),
    );

    // at
    chart.series.push(
      createColumnSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          at: poke.attack,
        })),
        options: {
          name: 'AT',
          categoryX: 'name',
          valueY: 'at',
          tooltipText: 'AT: {at}',
          minColor: am4core.color('#be3c3c7b'),
          maxColor: am4core.color('#410000a9'),
        },
      }),
    );

    // def
    chart.series.push(
      createColumnSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          def: poke.defense,
        })),
        options: {
          name: 'DEF',
          categoryX: 'name',
          valueY: 'def',
          tooltipText: 'DEF: {def}',
          minColor: am4core.color('#816f5379'),
          maxColor: am4core.color('#816f53d8'),
        },
      }),
    );

    // avgHp
    const avgHp =
      selectedPokemons.reduce((t, p) => t + p.hp, 0) / selectedPokemons.length;
    chart.series.push(
      createStepLineSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          avgHp,
        })),
        options: {
          name: 'avgHP',
          categoryX: 'name',
          valueY: 'avgHp',
          tooltipText: 'avgHP: {avgHp}',
          color: am4core.color('#38992f76'),
        },
      }),
    );

    // avgSp
    const avgSp =
      selectedPokemons.reduce((t, p) => t + p.speed, 0) /
      selectedPokemons.length;
    chart.series.push(
      createStepLineSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          avgSp,
        })),
        options: {
          name: 'avgSP',
          categoryX: 'name',
          valueY: 'avgSp',
          tooltipText: 'avgSP: {avgSp}',
          color: am4core.color('#239dad'),
        },
      }),
    );

    // avgSp
    const avgAt =
      selectedPokemons.reduce((t, p) => t + p.attack, 0) /
      selectedPokemons.length;
    chart.series.push(
      createStepLineSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          avgAt,
        })),
        options: {
          name: 'avgAT',
          categoryX: 'name',
          valueY: 'avgAt',
          tooltipText: 'avgAT: {avgAt}',
          color: am4core.color('#410000a9'),
        },
      }),
    );

    // avgDef
    const avgDef =
      selectedPokemons.reduce((t, p) => t + p.defense, 0) /
      selectedPokemons.length;
    chart.series.push(
      createStepLineSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          avgDef,
        })),
        options: {
          name: 'avgDEF',
          categoryX: 'name',
          valueY: 'avgDef',
          tooltipText: 'avgDEF: {avgDef}',
          color: am4core.color('#816f53d8'),
        },
      }),
    );

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chart.legend = new am4charts.Legend();

    chartRef.current = chart;
    return () => chartRef.current?.dispose();
  }, [selectedPokemons]);

  return !selectedPokemons.length ? null : (
    <div id="pokechart" style={{ height: '360px' }} />
  );
};

type CreateColumnSeries = {
  data: unknown[];
  options: {
    name: string;
    categoryX: string;
    valueY: string;
    tooltipText: string;
    minColor: am4core.Color;
    maxColor: am4core.Color;
  };
};

const createColumnSeries = ({ data, options }: CreateColumnSeries) => {
  const series = new am4charts.ColumnSeries();
  series.name = options.name;
  series.data = data;
  series.dataFields.valueY = options.valueY;
  series.dataFields.categoryX = options.categoryX;
  series.columns.template.stroke = options.minColor;
  series.columns.template.fill = options.minColor;
  series.strokeWidth = 3;
  series.tooltipText = options.tooltipText;
  series.heatRules.push({
    target: series.columns.template,
    property: 'fill',
    dataField: 'valueY',
    logarithmic: true,
    min: options.minColor,
    max: options.maxColor,
  });

  return series;
};

interface CreateStepLineSeries {
  data: unknown[];
  options: {
    name: string;
    categoryX: string;
    valueY: string;
    tooltipText: string;
    color: am4core.Color;
  };
}

const createStepLineSeries = ({ data, options }: CreateStepLineSeries) => {
  const series = new am4charts.StepLineSeries();
  series.name = options.name;
  series.data = data;
  series.dataFields.valueY = options.valueY;
  series.dataFields.categoryX = options.categoryX;
  series.tooltipText = options.tooltipText;
  series.stroke = options.color;
  series.strokeWidth = 2;
  series.hidden = true;

  return series;
};

export default Chart;
