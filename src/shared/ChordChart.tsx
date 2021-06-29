import React, { useEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import styled from 'styled-components';
import PokeSpin from 'shared/PokeSpin';

am4core.useTheme(am4themes_animated);

export interface ChordChartProps {
  data: { name: string; value: number; color: am4core.Color }[];
}

const StyledChart = styled.div<{ hide: boolean }>`
  height: 520px;

  ${({ hide }) => hide && 'visibility: hidden;'}
`;

const ChordChart: React.FC<ChordChartProps> = ({ data }) => {
  const chartRef = useRef<am4charts.SlicedChart>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chart = am4core.create('chord-chart', am4charts.SlicedChart);
    chart.data = data;

    const title = chart.titles.create();
    title.text = `Stats total: ${data.reduce(
      (total, d) => total + d.value,
      0,
    )}`;
    title.fontSize = 24;
    title.paddingBottom = 24;
    title.fontWeight = '700';
    title.align = 'left';

    chart.events.on('ready', () => setIsLoading(false));

    const series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.category = 'name';
    series.dataFields.value = 'value';

    series.maskSprite.path =
      'M299,82.5c113,0,205.7,86.7,215.1,197.2H379.7c-8-38-41.7-66.6-82.1-66.6c-40.4,0-74.1,28.6-82.1,66.6H83.9   C93.4,169.2,186.1,82.5,299,82.5z M343.9,279.7c2,5.4,3.1,11.2,3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0c0,6.1-1.1,11.9-3.1,17.3   c-7,18.8-25.1,32.1-46.3,32.1c-21.2,0-39.3-13.4-46.3-32.1c-2-5.4-3.1-11.2-3.1-17.3c0,0,0,0,0,0h-0.1c0,0,0,0,0,0   c0-6.1,1.1-11.9,3.1-17.3c7-18.8,25.1-32.1,46.3-32.1S336.9,261,343.9,279.7z M296.2,511.6c-113,0-205.7-86.7-215.1-197.2h134.4   c8,38,41.7,66.6,82.1,66.6s74.1-28.6,82.1-66.6h131.7C501.9,424.8,409.2,511.6,296.2,511.6z M297.6,41.3   C156.4,41.3,41.9,155.8,41.9,297s114.5,255.7,255.7,255.7S553.4,438.3,553.4,297S438.9,41.3,297.6,41.3z';

    series.slices.template.propertyFields.fill = 'color';
    series.labels.template.text = '{name}: {value}';

    series.alignLabels = true;

    chart.legend = new am4charts.Legend();
    chart.legend.paddingTop = 56;

    chartRef.current = chart;
    return () => chartRef.current?.dispose();
  }, [data]);

  return (
    <>
      {isLoading && <PokeSpin />}
      <StyledChart id="chord-chart" hide={isLoading} />
    </>
  );
};

export default ChordChart;
