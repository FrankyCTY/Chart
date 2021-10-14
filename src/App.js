import React, { useState } from 'react';
import { Visx } from './Visx';
import { CustomVisx } from './CustomVisx';
import { CustomPie } from './CustomPie';
import { CustomBarGroup } from './BarGroup';
import { TooltipOnTick } from './TooltipOnTick';
import { LineChartBase } from './LineChartBase';
import { MapChart } from './MapChart';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import './App.css';

function App() {
  const [chartPackage, setChartPackage] = useState('mapChart');

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <button onClick={() => setChartPackage('visx')}>Visx</button>
        <button onClick={() => setChartPackage('customVisx')}>
          CustomVisx
        </button>
        <button onClick={() => setChartPackage('customBarGroup')}>
          BarGroup
        </button>
        <button onClick={() => setChartPackage('customPie')}>CustomPie</button>
        <button onClick={() => setChartPackage('lineChartBase')}>
          LineChartBase
        </button>
        <button onClick={() => setChartPackage('mapChart')}>MapChart</button>
      </div>

      <div style={{ width: '500px', height: '500px' }}>
        {chartPackage === 'visx' && <Visx />}
        {chartPackage === 'customVisx' && <CustomVisx />}
        {chartPackage === 'customBarGroup' && <CustomBarGroup />}
        {chartPackage === 'customPie' && (
          <ParentSize>
            {({ width, height }) => <CustomPie width={width} height={height} />}
          </ParentSize>
        )}
        {chartPackage === 'tooltipOnTick' && <TooltipOnTick />}
        {chartPackage === 'lineChartBase' && <LineChartBase />}
        {chartPackage === 'mapChart' && (
          <ParentSize>
            {({ width, height }) => <MapChart width={width} height={height} />}
          </ParentSize>
        )}
      </div>
    </div>
  );
}

export default App;
