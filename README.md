### Fullstack Test on Node.js and React.js

This repository contains two folders:

#### 1. `nodejs`

```sh
cd node-js
```

Test

```sh
npm run dev-test
```

##### Question 1

As a NodeJS developer in your company, you are tasked with creating a queuing system that processes items asynchronously. This module/package will be used for processing distributed notifications in your company.

Create a module `queue.js` and implement the following functionalities:

- Export a class `AsyncQueue` as the default export of the module, inheriting from the `EventEmitter` class.
- The class should have the following methods:
  - `enqueue`: Accepts an item and adds it to the end of the queue. Emits an `enqueued` event with the item as the payload.
  - `peek`: Returns the item at the head of the queue without removing it.
  - `print`: Returns the items in the queue as an array.
  - `getCurrentInterval`: Returns the current interval for dequeuing items, initially set to 250ms.
  - `start`: Starts dequeuing items at the specified interval. Emits a `dequeued` event with the dequeued item as the payload.
  - `pause`: Pauses the dequeuing process.
- If the queue is empty when the timer expires (default: every 250ms), nothing should be dequeued or emitted, and the instance should keep listening for new items.
- The class should listen for the `interval` event. The data passed is a positive number indicating the new interval value, which should update immediately.

##### Test Requirements

- Export the class `AsyncQueue` as the default export of the module.
- Ensure that items passed to the `enqueue` method are valid (Number, String, Object only).
- The default interval for dequeuing items is set to 250ms initially.
- Test cases should handle emitting the `interval` event with only positive numbers, so no validation on numbers is required.

#### 2. `react`

```sh
cd react
```

Test

```sh
npm run dev-test
```

##### Question 2

The component must have the following functionalities:

- The input should initially be empty. The user can type a date in the format d-mmmm-yyyy (e.g., 5-January-2000).
- Clicking the 'Search' button should make an API GET call to `https://jsonmock.hackerrank.com/api/stocks?date={input}` using the fetch function. `{input}` is the date entered into the text box.
- The response will contain a `data` field with stock data:
  ```json
  "data": [
      {
          "date": "5-January-2000",
          "open": 5265.09,
          "high": 5464.35,
          "low": 5184.48,
          "close": 5357
      }
  ]
  ```
  Retrieve the `open`, `close`, `high`, and `low` values and render them in the specified format.
- Display the data inside `<ul data-testid="stock-data"></ul>` with the following list elements:
  - `<li>Open: {open}</li>`
  - `<li>Close: {close}</li>`
  - `<li>High: {high}</li>`
  - `<li>Low: {low}</li>`
- The `<ul data-testid="stock-data"></ul>` element is rendered only when data is fetched. Initially, it is not rendered.
- If the API returns no stock data, render `<div data-testid="no-result">No Results Found</div>` instead of the `<ul>` element. This div should not be rendered initially.

##### Required Data-testid Attributes

- Input field: `data-testid="app-input"`
- Search button: `data-testid="submit-button"`
- `<ul>` element: `data-testid="stock-data"`
- 'No Results Found' div: `data-testid="no-result"`
