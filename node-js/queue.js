const { EventEmitter } = require('events');

class AsyncQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
    this.interval = 250;
    this.isPaused = true;
    this.timer = null;
  }

  enqueue(item) {
    if (
      typeof item === 'number' ||
      typeof item === 'string' ||
      typeof item === 'object'
    ) {
      this.queue.push(item);
      this.emit('enqueued', item);
    }
  }

  peek() {
    return this.queue[0];
  }

  print() {
    return this.queue;
  }

  getCurrentInterval() {
    return this.interval;
  }

  start() {
    this.isPaused = false;
    if (!this.timer) {
      this.dequeue();
    }
  }

  pause() {
    this.isPaused = true;
  }

  dequeue() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.queue.length > 0 && !this.isPaused) {
        const item = this.queue.shift();
        this.emit('dequeued', item);
      }
    }, this.interval);
  }

  onInterval(newInterval) {
    clearInterval(this.timer);
    this.interval = newInterval;
    this.isPaused = false;
    this.dequeue();
  }
}

AsyncQueue.prototype.on('interval', function (newInterval) {
  this.onInterval(newInterval);
});

module.exports = AsyncQueue;
