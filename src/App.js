import React, { useState } from 'react';
import { Visx } from './Visx';
import { CustomVisx } from './CustomVisx';
import { CustomPie } from './CustomPie';
import { CustomBarGroup } from './BarGroup';
import { TooltipOnTick } from './TooltipOnTick';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import './App.css';

function App() {
  const [chartPackage, setChartPackage] = useState('customPie');

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
        <button onClick={() => setChartPackage('tooltipOnTick')}>
          CustomPie
        </button>
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
      </div>
    </div>
  );
}

export default App;
