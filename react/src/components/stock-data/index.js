import React, { useState } from 'react';
import './index.css';

export default function StockData() {
  const [inputDate, setInputDate] = useState('');
  const [stockData, setStockData] = useState(null);
  const [noResult, setNoResult] = useState(false);

  const handleInputChange = (event) => {
    setInputDate(event.target.value);
  };

  const fetchStockData = () => {
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${inputDate}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setStockData(data.data[0]);
          setNoResult(false);
        } else {
          setStockData(null);
          setNoResult(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
        setStockData(null);
        setNoResult(true);
      });
  };

  return (
    <div className='layout-column align-items-center mt-50'>
      <section className='layout-row align-items-center justify-content-center'>
        <input
          type='text'
          className='large'
          placeholder='5-January-2000'
          id='app-input'
          data-testid='app-input'
          value={inputDate}
          onChange={handleInputChange}
        />
        <button
          className=''
          id='submit-button'
          data-testid='submit-button'
          onClick={fetchStockData}
        >
          Search
        </button>
      </section>

      {stockData && (
        <ul
          className='mt-50 slide-up-fade-in styled'
          id='stockData'
          data-testid='stock-data'
        >
          <li className='py-10'>Open: {stockData.open}</li>
          <li className='py-10'>Close: {stockData.close}</li>
          <li className='py-10'>High: {stockData.high}</li>
          <li className='py-10'>Low: {stockData.low}</li>
        </ul>
      )}

      {noResult && (
        <div
          className='mt-50 slide-up-fade-in'
          id='no-result'
          data-testid='no-result'
        >
          No Results Found
        </div>
      )}
    </div>
  );
}
