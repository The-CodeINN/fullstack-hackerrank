import React from 'react';
import App from './App';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
  fetchMock.restore();
  cleanup()
});

test('initial UI is rendered as expected', () => {
  let {getByTestId, queryByTestId} = renderApp();
  expect(getByTestId('app-input')).toHaveTextContent('');
  expect(getByTestId('submit-button')).toHaveTextContent("Search");
  expect(queryByTestId('stock-data')).toBe(null);
  expect(queryByTestId('no-result')).toBe(null);
});

test('search is made on by clicking on search button and no results found', async () => {
  let {getByTestId, queryByTestId} = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/stocks?date=1-January-2002';
  fetchMock.getOnce(url, JSON.stringify({page: 1, per_page: 10, total: 0, total_pages: 0, data: []}));
  fireEvent.input(input, {
    target: {value: '1-January-2002'}
  });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(queryByTestId('stock-data')).toBe(null);
    expect(queryByTestId('no-result')).not.toBe(null);
    expect(getByTestId('no-result')).toHaveTextContent('No Results Found');
  });
});

test('search is made on by clicking on search button and result found - test 1', async () => {
  let {getByTestId, queryByTestId} = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000';
  fetchMock.getOnce(url, JSON.stringify({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
    data: [{"date": "5-January-2000", "open": 5265.09, "high": 5464.35, "low": 5184.48, "close": 5357}]
  }));
  fireEvent.input(input, {
    target: {value: '5-January-2000'}
  });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const results = queryByTestId('stock-data');
    expect(results.childNodes).toHaveLength(4);
    expect(results.childNodes[0]).toHaveTextContent('Open: 5265.09');
    expect(results.childNodes[1]).toHaveTextContent('Close: 5357');
    expect(results.childNodes[2]).toHaveTextContent('High: 5464.35');
    expect(results.childNodes[3]).toHaveTextContent('Low: 5184.48');
    expect(queryByTestId('no-result')).toBe(null);
  });
});

test('search is made on by clicking on search button and result found - test 2', async () => {
  let {getByTestId, queryByTestId} = renderApp();
  let input = getByTestId('app-input');
  let searchButton = getByTestId('submit-button');

  const url = 'https://jsonmock.hackerrank.com/api/stocks?date=5-January-2001';
  fetchMock.getOnce(url, JSON.stringify({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
    data: [{"date": "5-January-2001", "open": 4116.34, "high": 4195.01, "low": 4115.35, "close": 4183.73}]
  }));
  fireEvent.input(input, {
    target: {value: '5-January-2001'}
  });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const results = queryByTestId('stock-data');
    expect(results.childNodes).toHaveLength(4);
    expect(results.childNodes[0]).toHaveTextContent('Open: 4116.34');
    expect(results.childNodes[1]).toHaveTextContent('Close: 4183.73');
    expect(results.childNodes[2]).toHaveTextContent('High: 4195.01');
    expect(results.childNodes[3]).toHaveTextContent('Low: 4115.35');
    expect(queryByTestId('no-result')).toBe(null);
  });
});
