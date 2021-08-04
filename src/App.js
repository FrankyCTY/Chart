import React, { useState } from 'react';
import { Visx } from './Visx';
import { CustomVisx } from './CustomVisx';
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
      </div>

      <div style={{ width: '100%', height: '100%' }}>
        {chartPackage === 'visx' && <Visx />}
        {chartPackage === 'customVisx' && <CustomVisx />}
      </div>
    </div>
  );
}

export default App;
