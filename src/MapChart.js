import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator } from '@visx/geo';
import * as topojson from 'topojson-client';
import topo from './nzTopo.json';
import { scaleLinear } from 'd3';

export const background = '#f9f7e8';

// get min and max from the data and populate into domain
const c = scaleLinear().domain([1, 10]).range(['#A4E0DB', '#22635E']);
console.log(c);

console.log(c(2));
console.log(c(8));

// @ts-ignore
// const world = topojson.feature(topology, topology.objects.units);
const worldGeoJson = topojson.feature(topo, topo.objects.NZL_adm2);
// console.log(worldGeoJson);

const color = scaleQuantize({
  domain: [
    Math.min(
      ...worldGeoJson.features.map((f) => f.geometry.coordinates.length)
    ),
    Math.max(
      ...worldGeoJson.features.map((f) => f.geometry.coordinates.length)
    ),
  ],
  range: [
    '#ffb01d',
    '#ffa020',
    '#ff9221',
    '#ff8424',
    '#ff7425',
    '#fc5e2f',
    '#f94b3a',
    '#f63a48',
  ],
});

const sc = 50;
const scaleRatioX = 4;
const scaleRatioY = 1;

const offsetX = sc * scaleRatioX;
// const ratioX = 14;
const ratioX = offsetX / 14.28;

const offsetY = sc * scaleRatioY;
// const ratioY = 15;
const ratioY = offsetY / 3.33;

export const MapChart = ({ width, height, events = true }) => {
  // const centerX = width / 2 - 2820;
  const centerX = width / 2 - offsetX * ratioX;
  const centerY = height / 2 - offsetY * ratioY;
  const scale = (width / sc) * 100;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
        rx={14}
      />
      <Mercator
        data={worldGeoJson.features}
        scale={scale}
        translate={[centerX - offsetX, centerY - offsetY]}
      >
        {(mercator) => {
          // console.log('mercator', mercator);
          return (
            <g>
              {mercator.features.map(({ feature, path }, i) => {
                // console.log(feature);

                return (
                  <path
                    key={`map-feature-${i}`}
                    d={path || ''}
                    fill={color(feature.geometry.coordinates.length)}
                    // fill={feature.properties.NAME_1 === '' && 'pink'}
                  />
                );
              })}
            </g>
          );
        }}
      </Mercator>
    </svg>
  );
};
