import React, { useState, useCallback } from 'react';
import './index.css';

const API_BASE_URL = 'https://jsonmock.hackerrank.com/api/stocks';

export default function StockData() {
  const [inputDate, setInputDate] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const isValidDate = useCallback((date) => {
    const dateRegex =
      /^(\d{1,2})-(January|February|March|April|May|June|July|August|September|October|November|December)-(\d{4})$/;
    return dateRegex.test(date);
  }, []);

  const fetchStockData = useCallback(async () => {
    // Clear previous data and errors
    setStockData(null);
    setError('');

    if (!inputDate) {
      setError('Please enter a date');
      return;
    }

    if (!isValidDate(inputDate)) {
      setError('Please enter a valid date in the format dd-mmmm-yyyy');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}?date=${inputDate}`);
      const { data } = await response.json();
      if (data && data.length > 0) {
        setStockData(data[0]);
      } else {
        setError('No Results Found');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('An error occurred while fetching data');
    }
  }, [inputDate, isValidDate]);

  const handleInputChange = useCallback((event) => {
    setInputDate(event.target.value);
  }, []);

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

      {stockData && !error && (
        <ul
          className='mt-50 slide-up-fade-in styled'
          id='stockData'
          data-testid='stock-data'
        >
          {['open', 'close', 'high', 'low'].map((key) => (
            <li key={key} className='py-10'>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {stockData[key]}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div
          className='mt-50 slide-up-fade-in pa-20'
          id='no-result'
          data-testid='no-result'
        >
          {error}
        </div>
      )}
    </div>
  );
}
