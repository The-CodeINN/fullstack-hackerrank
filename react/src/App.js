import React from 'react';
import './App.css';
import 'h8k-components';
import StockData from './components/stock-data/index.js';

const title = "Stock Data";

function App() {
  return (
    <div>
      <h8k-navbar header={title} />
      <StockData/>
    </div>
  );
}

export default App;
