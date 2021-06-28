import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export interface CreateLineBulletsSeries {
  data: {
    name: string;
    value: number;
  }[];
  options: {
    name: string;
    categoryX?: string;
    valueY?: string;
    tooltipText?: string;
    color: am4core.Color;
  };
}

const createLineBulletsSeries = ({
  data,
  options,
}: CreateLineBulletsSeries) => {
  const series = new am4charts.LineSeries();
  series.name = options.name;
  series.data = data;
  series.dataFields.categoryX = options.categoryX ?? 'name';
  series.dataFields.valueY = options.valueY ?? 'value';
  series.dataFields.value = options.valueY ?? 'value';
  series.segments.template.strokeWidth = 23;
  series.strokeOpacity = 0;
  series.fillOpacity = 0;
  series.tooltipText = options.tooltipText ?? '{name} {valueY}';
  series.fill = options.color;
  const bullets = series.bullets.push(new am4charts.CircleBullet());
  bullets.strokeOpacity = 0;
  bullets.tooltipText = options.tooltipText ?? '{name} {valueY}';
  bullets.showTooltipOn = 'hit';

  series.heatRules.push({
    target: bullets.circle,
    property: 'radius',
    min: 10,
    max: 80,
  });

  return series;
};

export interface CreatePokeBubbleStatSeries {
  data: {
    name: string;
    value: number;
  }[];
  options: {
    name: string;
    categoryX?: string;
    valueY?: string;
    tooltipText?: string;
    color: am4core.Color;
  };
}

const createPokeBubbleStatSeries = ({
  data,
  options,
}: CreatePokeBubbleStatSeries) => {
  const lineBulletsSeries = createLineBulletsSeries({
    data,
    options,
  });

  return [lineBulletsSeries];
};

export default createPokeBubbleStatSeries;
