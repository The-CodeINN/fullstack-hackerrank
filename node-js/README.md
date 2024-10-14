# Async Queue Processor

**Running the command npm start initially will fail as the class AsyncQueue
is not been created in the module `queue.js`. It is the your responsibility to create the class and export 
it from the from the module.**

## AsyncQueue - Class Definition

### Methods:
- enqueue
- peek
- print
- getCurrentInterval
- start
- pause

### Events:

- Emits
  - enqueued - Emitted when an item is enqueued
  - dequeued - Emitted when an item is dequeued
  
- Listens
  - interval - Accepts Number, updates the default interval for the instance

