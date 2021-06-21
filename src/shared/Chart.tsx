import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedList } from 'redux/pokemonReducer';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import createPokeStatSeries from 'utils/createPokeStatSeries';

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
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.00';

    // legend
    chart.legend = new am4charts.Legend();

    // HP Series
    chart.series.pushAll(
      createPokeStatSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          value: poke.hp,
        })),
        options: {
          statSeries: {
            name: 'HP',
            tooltipText: 'HP {value}',
            minColor: am4core.color('#76b67088'),
            maxColor: am4core.color('#07550087'),
          },
          avgSeries: {
            name: 'avgHP',
            tooltipText: 'avgHP: {value}',
            color: am4core.color('#38992f'),
          },
          ranges: {
            valueAxis,
            tooltipText: 'MaxHP {value}',
            color: am4core.color('#38992f'),
          },
        },
      }),
    );

    // SP Series
    chart.series.pushAll(
      createPokeStatSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          value: poke.speed,
        })),
        options: {
          statSeries: {
            name: 'SP',
            tooltipText: 'SP {value}',
            minColor: am4core.color('#3cafbe7c'),
            maxColor: am4core.color('#003941a9'),
          },
          avgSeries: {
            name: 'avgSP',
            tooltipText: 'avgSP: {value}',
            color: am4core.color('#239dad'),
          },
          ranges: {
            valueAxis,
            tooltipText: 'MaxSP {value}',
            color: am4core.color('#239dad'),
          },
        },
      }),
    );

    // AT Series
    chart.series.pushAll(
      createPokeStatSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          value: poke.attack,
        })),
        options: {
          statSeries: {
            name: 'AT',
            tooltipText: 'AT {value}',
            minColor: am4core.color('#be3c3c7b'),
            maxColor: am4core.color('#410000a9'),
          },
          avgSeries: {
            name: 'avgAT',
            tooltipText: 'avgAT: {value}',
            color: am4core.color('#410000a9'),
          },
          ranges: {
            valueAxis,
            tooltipText: 'MaxAT {value}',
            color: am4core.color('#410000a9'),
          },
        },
      }),
    );

    // DEF Series
    chart.series.pushAll(
      createPokeStatSeries({
        data: selectedPokemons.map((poke) => ({
          name: poke.name,
          value: poke.defense,
        })),
        options: {
          statSeries: {
            name: 'DEF',
            tooltipText: 'DEF {value}',
            minColor: am4core.color('#816f5379'),
            maxColor: am4core.color('#816f53d8'),
          },
          avgSeries: {
            name: 'avgDEF',
            tooltipText: 'avgDEF: {value}',
            color: am4core.color('#816f53d8'),
          },
          ranges: {
            valueAxis,
            tooltipText: 'MaxDEF {value}',
            color: am4core.color('#816f53d8'),
          },
        },
      }),
    );

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color('#000');
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chartRef.current = chart;
    return () => chartRef.current?.dispose();
  }, [selectedPokemons]);

  return !selectedPokemons.length ? null : (
    <div id="pokechart" style={{ height: '520px' }} />
  );
};

export default Chart;
