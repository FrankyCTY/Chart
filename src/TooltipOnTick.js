import React, { useState } from 'react';
import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear, coerceNumber } from '@visx/scale';
import { Orientation } from '@visx/axis';
import { AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { useTooltipInPortal } from '@visx/tooltip';
import { Axis } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';

export const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = '#340098';
const gridColor = '#6e0fca';
const margin = {
  top: 40,
  right: 150,
  bottom: 20,
  left: 50,
};

const tickLabelProps = () => ({
  fill: tickLabelColor,
  fontSize: 12,
  fontFamily: 'sans-serif',
  textAnchor: 'middle',
});

const getMinMax = (vals) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export function TooltipOnTick({
  width: outerWidth = 800,
  height: outerHeight = 800,
  showControls = true,
}) {
  // in svg, margin is subtracted from total width/height
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  const [dataToggle, setDataToggle] = useState(true);
  const [hoveredTickValue, setHoveredTickValue] = useState();
  const { containerRef, TooltipInPortal } = useTooltipInPortal();
  const [animationTrajectory, setAnimationTrajectory] = useState(
    'max' > 'center'
  );

  const tickValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
  const xScale = scaleLinear({
    domain: getMinMax(tickValues),
    range: [0, width],
  });
  const tickFormat = (v, index, ticks) => `${v} long long long long long long`;

  if (width < 10) return null;

  const scalePadding = height / 4;
  const scaleHeight = height - scalePadding;

  const yScale = scaleLinear({
    domain: [100, 0],
    range: [scaleHeight, 0],
  });

  console.log(hoveredTickValue);

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="visx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={'url(#visx-axis-gradient)'}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AnimatedGridRows
            // force remount when this changes to see the animation difference
            key={`gridrows-${animationTrajectory}`}
            scale={yScale}
            stroke={gridColor}
            width={width}
            numTicks={dataToggle ? 1 : 3}
            animationTrajectory={animationTrajectory}
          />
          <AnimatedGridColumns
            // force remount when this changes to see the animation difference
            key={`gridcolumns-${animationTrajectory}`}
            scale={xScale}
            stroke={gridColor}
            height={scaleHeight}
            numTicks={dataToggle ? 5 : 2}
            animationTrajectory={animationTrajectory}
          />
          <AreaClosed
            data={tickValues.map((x, i) => [xScale(x) ?? 0, yScale(i * 15)])}
            yScale={yScale}
            curve={curveMonotoneX}
            fill={gridColor}
            fillOpacity={0.2}
          />
          <Axis
            // force remount when this changes to see the animation difference
            key={`axis-${animationTrajectory}`}
            orientation={Orientation.bottom}
            top={scaleHeight}
            scale={xScale}
            tickFormat={tickFormat}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={tickLabelProps}
            tickValues={tickValues}
            label="Linear scale"
            labelProps={{
              x: width + 30,
              y: -10,
              fill: labelColor,
              fontSize: 18,
              strokeWidth: 0,
              stroke: '#fff',
              paintOrder: 'stroke',
              fontFamily: 'sans-serif',
              textAnchor: 'start',
            }}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <g>
                <text
                  ref={
                    formattedValue === hoveredTickValue
                      ? containerRef
                      : undefined
                  }
                  onPointerEnter={() => setHoveredTickValue(formattedValue)}
                  onPointerLeave={() => setHoveredTickValue(null)}
                  {...tickProps}
                  fill={'yellow'}
                >
                  {formattedValue.slice(0, 11)}...
                </text>
                {hoveredTickValue === formattedValue && (
                  <TooltipInPortal offsetTop={20} offsetLeft={-50}>
                    <div>
                      Full value in HTML
                      <br />
                      {formattedValue}
                    </div>
                  </TooltipInPortal>
                )}
              </g>
            )}
          />
        </g>
      </svg>
      {showControls && (
        <>
          <div style={{ fontSize: 11 }}>
            <strong>animation trajectory</strong>
            <label>
              <input
                type="radio"
                onChange={() => setAnimationTrajectory('outside')}
                checked={animationTrajectory === 'outside'}
              />{' '}
              outside
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setAnimationTrajectory('center')}
                checked={animationTrajectory === 'center'}
              />{' '}
              center
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setAnimationTrajectory('min')}
                checked={animationTrajectory === 'min'}
              />{' '}
              min
            </label>
            <label>
              <input
                type="radio"
                onChange={() => setAnimationTrajectory('max')}
                checked={animationTrajectory === 'max'}
              />{' '}
              max
            </label>
          </div>
          <button onClick={() => setDataToggle(!dataToggle)}>
            Update scales
          </button>
        </>
      )}
    </>
  );
}
