import React, { useEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import createPokeBubbleStatSeries, {
  CreateLineBulletsSeries,
} from 'utils/createPokeBubbleStatSeries';

am4core.useTheme(am4themes_animated);

export interface BubbleStatChartProps {
  chartId: string;
  titleText: string;
  data: CreateLineBulletsSeries['data'];
  options: CreateLineBulletsSeries['options'];
}

const BubbleStatChart: React.FC<BubbleStatChartProps> = ({
  chartId,
  titleText,
  data,
  options,
}) => {
  const chartRef = useRef<am4charts.XYChart>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.paddingRight = 20;

    const nameData = data.map((d) => ({
      name: d.name,
    }));
    chart.data = nameData;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = 'left';

    const title = chart.titles.create();
    title.text = titleText;

    title.fontWeight = '700';
    title.fontSize = 28;

    chart.events.on('ready', () => setIsLoading(false));

    // categoryAxis
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.title.text = 'Pokemons';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;

    // valueAxis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Values';
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.extraMax = 0.5;

    // series
    chart.series.pushAll(
      createPokeBubbleStatSeries({
        data,
        options,
      }),
    );

    // legend
    chart.legend = new am4charts.Legend();

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.scrollbarX = new am4core.Scrollbar();

    chartRef.current = chart;

    return () => chartRef.current!.dispose();
  }, [data]);

  return (
    <>
      {isLoading && <h5>loading...</h5>}
      <div id={chartId} />
    </>
  );
};

export default BubbleStatChart;
