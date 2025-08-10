import React, { JSX, useCallback, useMemo, useState } from 'react';
import { ScaleSequential } from 'd3-scale';
import { Orientation, Scale, TopoJSONMap } from '@unovis/ts';
import { WorldMapTopoJSON } from '@unovis/ts/maps';
import { VisSingleContainer, VisTopoJSONMap, VisTooltip, VisAxis, VisXYContainer, VisStackedBar } from '@unovis/react';
import { palette, data, ageRange, yearRange, AreaDatum } from '../lib/mapData';


type YearSliderProps = {
  current: number;
  range: [number, number];
  onUpdate: (value: number) => void;
};

function YearSlider({ current, range, onUpdate }: YearSliderProps): JSX.Element {
  return (
    <header>
      <h2>Press Freedom by Country, <em>{current}</em></h2>
      <input
        type="range"
        value={current}
        min={range[0]}
        max={range[1]}
        onChange={(e) => onUpdate(Number(e.target.value))}
      />
    </header>
  );
}

type GradientLegendProps = {
  colors: ScaleSequential<string>;
  range: [number, number];
  title: string;
  width: number | string;
};

function GradientLegend({ colors, range, title, width }: GradientLegendProps): JSX.Element {
  const y = Array(range[1] - range[0]).fill(1);
  const color = useCallback((_: number, i: number): string => colors(i + range[0]), [colors, range]);
  return (
    <div className="gradient-legend-container">
      <VisXYContainer data={[{}]} height={70} width={width}>
        <VisStackedBar orientation={Orientation.Horizontal} x={0} y={y} color={color} />
        <VisAxis
          type="x"
          label={title}
          position="top"
          numTicks={(range[1] - range[0]) / 5}
          tickFormat={useCallback((i: number) => `${range[0] + i}`, [range])}
        />
      </VisXYContainer>
    </div>
  );
}

type TopojsonMapProps = {
  height?: number;
  width?: string | number;
  initialYear?: number;
};

export function TopojsonMap({ height = 550, width = '100vw', initialYear = 2019 }: TopojsonMapProps): JSX.Element {
  const mapData = useMemo(() => ({ areas: data }), []);
  const [year, setYear] = useState(initialYear);

  const colorScale = Scale.scaleSequential(palette).domain(ageRange);
  const yearScale = Scale.scaleLinear()
    .domain(yearRange)
    .rangeRound([0, yearRange[1] - yearRange[0]]);

  const getExpectancy = useCallback((d: AreaDatum) => d.age[yearScale(year)], [year]);
  const getAreaColor = useCallback((d: AreaDatum) => colorScale(getExpectancy(d)), [getExpectancy]);

  const tooltipTriggers = {
    [TopoJSONMap.selectors.feature]: (d: any) =>
      `${d.properties.name}: ${d.data ? getExpectancy(d.data) : 'no data'}`,
  };

  const legendWidth = typeof width === 'string' && width.includes('vw') ? '100%' : width;

  return (
    <div className="topojson-map">
      <YearSlider current={year} range={yearRange} onUpdate={setYear} />
      <VisSingleContainer data={mapData} height={height} width={width} duration={0}>
        <VisTopoJSONMap topojson={WorldMapTopoJSON} areaColor={getAreaColor} disableZoom />
        <VisTooltip triggers={tooltipTriggers} />
      </VisSingleContainer>
      <GradientLegend title="Press Freedom Index (higher the better)" colors={colorScale} range={ageRange} width={legendWidth} />
    </div>
  );
}