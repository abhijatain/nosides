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
    <div style={{ textAlign: 'center' }}>
      <h2>Press Freedom by Country, <em>{current}</em></h2>
      <input
        type="range"
        value={current}
        min={range[0]}
        max={range[1]}
        onChange={(e) => onUpdate(Number(e.target.value))}
        style={{ width: '300px' }}
      />
    </div>
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

type FullscreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function FullscreenModal({ isOpen, onClose, children }: FullscreenModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '80vw',
          height: '80vh',
          backgroundColor: 'white',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

type MapContentProps = {
  year: number;
  height: number;
  width: string | number;
  enableZoom: boolean;
};

function MapContent({ year, height, width, enableZoom }: MapContentProps): JSX.Element {
  const mapData = useMemo(() => ({ areas: data }), []);

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
    <>
      <VisSingleContainer data={mapData} height={height} width={width} duration={0}>
        <VisTopoJSONMap 
          topojson={WorldMapTopoJSON} 
          areaColor={getAreaColor} 
          disableZoom={!enableZoom} 
        />
        <VisTooltip triggers={tooltipTriggers} />
      </VisSingleContainer>
      <GradientLegend 
        title="Press Freedom Index (higher the better)" 
        colors={colorScale} 
        range={ageRange} 
        width={legendWidth} 
      />
    </>
  );
}

type TopojsonMapProps = {
  height?: number;
  width?: string | number;
  initialYear?: number;
};

export function TopojsonMap({ height = 550, width = '100vw', initialYear = 2019 }: TopojsonMapProps): JSX.Element {
  const [year, setYear] = useState(initialYear);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="topojson-map">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <YearSlider current={year} range={yearRange} onUpdate={setYear} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsFullscreen(true)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#ffffffff',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <MapContent 
        year={year} 
        height={height} 
        width={width} 
        enableZoom={false} 
      />

      <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)}>
        <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <YearSlider current={year} range={yearRange} onUpdate={setYear} />
          <div style={{ flex: 1, marginTop: '10px' }}>
            <MapContent 
              year={year} 
              height={window.innerHeight * 0.8 - 150} // Account for header and padding
              width="100%" 
              enableZoom={true} 
            />
          </div>
        </div>
      </FullscreenModal>
    </div>
  );
}