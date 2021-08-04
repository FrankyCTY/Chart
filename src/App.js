import React, { useState } from 'react';
import { Visx } from './Visx';
import { CustomVisx } from './CustomVisx';
import { CustomPie } from './CustomPie';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import './App.css';

function App() {
  const [chartPackage, setChartPackage] = useState('customVisx');

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <button onClick={() => setChartPackage('visx')}>Visx</button>
        <button onClick={() => setChartPackage('customVisx')}>
          CustomVisx
        </button>
        <button onClick={() => setChartPackage('customPie')}>CustomPie</button>
      </div>

      <div style={{ width: '500px', height: '500px' }}>
        {chartPackage === 'visx' && <Visx />}
        {chartPackage === 'customVisx' && <CustomVisx />}
        {chartPackage === 'customPie' && (
          <ParentSize>
            {({ width, height }) => <CustomPie width={width} height={height} />}
          </ParentSize>
        )}
      </div>
    </div>
  );
}

export default App;
