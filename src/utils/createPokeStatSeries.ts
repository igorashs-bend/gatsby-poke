import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export interface CreateColumnSeries {
  data: unknown[];
  options: {
    name: string;
    categoryX: string;
    valueY: string;
    tooltipText: string;
    minColor: am4core.Color;
    maxColor: am4core.Color;
  };
}

export const createColumnSeries = ({ data, options }: CreateColumnSeries) => {
  const series = new am4charts.ColumnSeries();
  series.name = options.name;
  series.data = data;
  series.dataFields.valueY = options.valueY;
  series.dataFields.categoryX = options.categoryX;
  series.columns.template.stroke = options.minColor;
  series.columns.template.fill = options.minColor;
  series.strokeWidth = 2;
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

export interface CreateStepLineSeries {
  data: unknown[];
  options: {
    name: string;
    categoryX: string;
    valueY: string;
    tooltipText: string;
    color: am4core.Color;
  };
}

export const createStepLineSeries = ({
  data,
  options,
}: CreateStepLineSeries) => {
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

export interface CreateRanges {
  valueAxis: am4charts.ValueAxis;
  series: am4charts.XYSeries;
  avgValue: number;
  maxValue: number;
  tooltipText: string;
  color: am4core.Color;
}

export const createRanges = ({
  valueAxis,
  series,
  avgValue,
  maxValue,
  tooltipText,
  color,
}: CreateRanges) => {
  const range = valueAxis.createSeriesRange(series);
  range.value = avgValue;
  range.endValue = maxValue;
  range.contents.stroke = color;
  range.contents.fillOpacity = 0.7;

  // eslint-disable-next-line no-param-reassign
  series.legendSettings.valueText = `[bold]${maxValue}`;
  // eslint-disable-next-line no-param-reassign
  series.legendSettings.itemValueText = '[bold]{valueY}';

  const maxRange = valueAxis.axisRanges.create();
  maxRange.axisFill.fill = color;
  maxRange.axisFill.fillOpacity = 1;
  maxRange.axisFill.tooltipText = tooltipText;
  maxRange.value = maxValue;
  maxRange.endValue = maxValue;
  maxRange.bullet = new am4core.Triangle();
  maxRange.bullet.width = 14;
  maxRange.bullet.height = 14;
  maxRange.bullet.fill = color;
  maxRange.grid.disabled = true;
  maxRange.bullet.horizontalCenter = 'middle';
  maxRange.bullet.verticalCenter = 'bottom';
  maxRange.bullet.rotation = 90;
  maxRange.bullet.tooltipText = tooltipText;

  series.events.on('hidden', () => {
    maxRange.hide();
  });

  series.events.on('shown', () => {
    maxRange.show();
  });
};

export interface CreatePokeStatSeries {
  data: { name: string; value: number }[];
  options: {
    statSeries: {
      name: string;
      tooltipText: string;
      minColor: am4core.Color;
      maxColor: am4core.Color;
    };
    avgSeries: {
      name: string;
      tooltipText: string;
      color: am4core.Color;
    };
    maxSeries?: {
      name: string;
      tooltipText: string;
      color: am4core.Color;
    };
    ranges?: {
      valueAxis: am4charts.ValueAxis;
      tooltipText: string;
      color: am4core.Color;
    };
  };
}

const createPokeStatSeries = ({ data, options }: CreatePokeStatSeries) => {
  const statSeries = createColumnSeries({
    data,
    options: { ...options.statSeries, categoryX: 'name', valueY: 'value' },
  });

  const avgValue = data.reduce((t, p) => t + p.value, 0) / data.length;
  const avgData = data.map((i) => ({ ...i, value: avgValue }));
  const maxValue = data.reduce((max, i) => {
    if (i.value > max) return i.value;
    return max;
  }, 0);

  const avgSeries = createStepLineSeries({
    data: avgData,
    options: { ...options.avgSeries, categoryX: 'name', valueY: 'value' },
  });

  if (options.ranges)
    createRanges({
      ...options.ranges,
      series: statSeries,
      avgValue,
      maxValue,
    });

  return [statSeries, avgSeries];
};

export default createPokeStatSeries;
