import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

// We'll use some mock data from `@visx/mock-data` for this.
// const data = letterFrequency;
// console.log(data);
const data = [
  { letter: 'A', frequency: 0.5 },
  { letter: 'B', frequency: 0.2 },
  { letter: 'C', frequency: 0.3 },
];

// Define the graph dimensions and margins
const width = 500; // graph width
const height = 500; // graph height
const margin = { top: 20, bottom: 20, left: 0, right: 0 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = (d) => d.letter;
const y = (d) => +d.frequency * 100;

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
  domain: [0, Math.max(...data.map(y))], // Y axis-data range
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
              />
            </Group>
          );
        })}
        <AxisLeft
          scale={yScale}
          label="hi"
          stroke={purple3}
          tickStroke={purple2}
          orientation="left"
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
