import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { useTooltipInPortal } from '@visx/tooltip';
import { Text } from '@visx/text';

// We'll use some mock data from `@visx/mock-data` for this.
const data = [
  { key: 'A', value: 0.5 },
  { key: 'B', value: 0.2 },
  { key: 'C', value: 0.3 },
];

// Define the graph dimensions and margins
const width = 500; // graph width
const height = 500; // graph height
const margin = { top: 20, bottom: 20, left: 0, right: 0 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = (d) => d.key;
const y = (d) => +d.value * 100;

const distanceBetweenTallestBarAndMaxHeight = 10;

// And then scale the graph by our data
const xScale = scaleBand({
  range: [0, xMax], // maxWidth
  round: true,
  domain: data.map(x), // X axis data range
  padding: 0.5, // padding of each bar
});
const yScale = scaleLinear({
  range: [yMax, 0], // maxHeight
  round: true,
  domain: [0, Math.max(...data.map(y)) + distanceBetweenTallestBarAndMaxHeight], // Y axis-data range
});

// Compose together the scale and accessor functions to get point functions
// calculate the position of each Bar by the scale and the data item
const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

const purple1 = '#6c5efb';
const purple2 = '#c998ff';
export const purple3 = '#a44afe';

// Finally we'll embed it all in an SVG
export function CustomVisx(props) {
  const [hoveredTickValue, setHoveredTickValue] = React.useState();
  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  return (
    <div
      style={{
        border: '1px solid blue',
        display: 'inline-block',
        padding: '50px 60px',
      }}
    >
      <svg width={width} height={height} overflow="visible">
        <rect x={0} y={0} width={width} height={height} fill={'pink'} rx={14} />
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d) - 20} // adjust rect size by x (0.5) and width (1)
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth() + 40}
                fill="#e1c"
                onClick={(events) => {
                  if (!events) return;
                  const { key, value } = d;
                  console.log(d);
                  alert(JSON.stringify({ key, value }));
                }}
              />
            </Group>
          );
        })}
        <AxisLeft
          scale={yScale}
          stroke={purple3}
          tickStroke={purple2}
          orientation="left"
          hideAxisLine
          numTicks={6}
          strokeWidth={0}
          tickClassName="my"
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text
                {...tickProps}
                ref={
                  formattedValue === hoveredTickValue ? containerRef : undefined
                }
                onPointerEnter={() => setHoveredTickValue(formattedValue)}
                onPointerLeave={() => setHoveredTickValue(null)}
              >
                {formattedValue}
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
        <AxisBottom
          top={yMax}
          scale={xScale}
          tickFormat={(a) => a}
          stroke={purple3}
          tickStroke={purple2}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </svg>
    </div>
  );
}
