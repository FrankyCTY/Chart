import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';
import styled from 'styled-components';
import { format } from 'date-fns';

const data1 = [
  {
    x: '2018-03-01',
    y: 30,
  },
  {
    x: '2018-04-01',
    y: 16,
  },
  {
    x: '2018-05-01',
    y: 17,
  },
  {
    x: '2018-06-01',
    y: 24,
  },
  {
    x: '2018-07-01',
    y: 47,
  },
  {
    x: '2018-08-01',
    y: 32,
  },
  {
    x: '2018-09-01',
    y: 8,
  },
  {
    x: '2018-10-01',
    y: 27,
  },
  {
    x: '2018-11-01',
    y: 31,
  },
  {
    x: '2018-12-01',
    y: 105,
  },
  {
    x: '2019-01-01',
    y: 166,
  },
  {
    x: '2019-02-01',
    y: 181,
  },
  {
    x: '2019-03-01',
    y: 232,
  },
  {
    x: '2019-04-01',
    y: 224,
  },
  {
    x: '2019-05-01',
    y: 196,
  },
  {
    x: '2019-06-01',
    y: 211,
  },
];

const tickLabelOffset = 10;

const accessors = {
  xAccessor: (d) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d) => d.y,
};

const LineChart = () => {
  return (
    <XYChart height={300} xScale={{ type: 'time' }} yScale={{ type: 'linear' }}>
      <AnimatedAxis hideAxisLine hideTicks orientation="bottom" numTicks={4} />
      <AnimatedAxis hideAxisLine hideTicks orientation="left" numTicks={4} />
      <AnimatedGrid
        columns={false}
        numTicks={4}
        lineStyle={{
          stroke: '#e1e1e1',
          strokeLinecap: 'round',
          strokeWidth: 1,
        }}
        strokeDasharray="0, 4"
      />
      <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
      {/* <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} /> */}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showSeriesGlyphs
        glyphStyle={{
          fill: '#008561',
          strokeWidth: 0,
        }}
        renderTooltip={({ tooltipData }) => {
          return (
            <TooltipContainer>
              {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                const [key, value] = lineDataArray;

                return (
                  <div className="row" key={key}>
                    <div className="date">
                      {format(accessors.xAccessor(value.datum), 'MMM d')}
                    </div>
                    <div className="value">
                      <ColoredSquare color="#008561" />
                      {accessors.yAccessor(value.datum)}
                    </div>
                  </div>
                );
              })}
            </TooltipContainer>
          );
        }}
      />
    </XYChart>
  );
};

export const LineChartBase = () => {
  return <LineChart />;
};

const ChartContainer = styled.div`
  text {
    font-family: 'Untitled Sans', sans-serif;
  }

  .visx-axis-tick {
    text {
      font-size: 12px;
      font-weight: 400;
      fill: #666666;
    }
  }
`;

const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
`;

const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;

  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;
