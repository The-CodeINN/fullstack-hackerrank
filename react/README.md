# React: Stocks Data

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/ypsXP2TV_jJ_W9qOYC4AVw/Screen%20Recording%202020-03-26%20at%202.06.18%20AM.2020-03-26%2002_11_08.gif)

## Functionality Requirements

- The input should initially be empty. The user can type a date in this input box, for which the stock data has to be searched. The date format has to be d-mmmm-yyyy (e.g., 5-January-2000).
- Clicking on the 'Search' button should make an API GET call to URL `https://jsonmock.hackerrank.com/api/stocks?date={input}` using the JavaScript Fetch API, specifically the fetch function. Here, {input} is the date entered into the text box. For example, for date 5-January-2000, the API hit has to be `https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000`. The date passed to the URL must not have any leading zeroes in the day.
- The response will contain a data field that contains stock data in the below format:
```
{
  "data": [
    {
      "date": "5-January-2000",
      "open": 5265.09,
      "high": 5464.35,
      "low": 5184.48,
      "close": 5357
    }
  ]
}
``` 
- The data field is an array containing single object. This single object contains the desired data. Retrieve the open, close, high, and low values from this, and render in the format explained below.
- Display the data inside `<ul data-testid="stock-data"></ul>`. This list will have the following list elements(in order as mentioned below):
  * `<li>Open: {open}</li>`, where {open} is the open value received from data above
  * `<li>Close: {close}</li>`, where {close} is the close value received from data above
  * `<li>High: {high}</li>`, where {high} is the high value received from data above
  * `<li>Low: {low}</li>`, where {low} is the low value received from data above

- The element `<ul data-testid="stock-data"></ul>` is rendered only when data is fetched and the result is shown. Initially, it is not rendered since no API has been hit yet.
- If there is no stock data returned by the API, the user should render `<div data-testid="no-result">No Results Found</div>` instead of the `<ul>` element. This element should be visible only when the data field is an empty array. This div should not be rendered initially since no API has been hit yet.
- Please note that the input field accepts the date as text. Input will be tested only with valid dates, so writing input validation is not required.

## Testing Requirements

The following data-testid attributes are required in the component for the tests to pass:

- Input should have the data-testid attribute 'app-input'.
- Search button should have the data-testid attribute 'submit-button'.
- `<ul>` should have the data-testid attribute 'stock-data'.
- The 'No Results Found' div should have the data-testid attribute 'no-result'.

Please note that component has above data-testids for test cases and certain classes and ids for rendering purposes. It is advised not to change them.

## Project Specifications

**Read Only Files**
- src/App.test.js

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
