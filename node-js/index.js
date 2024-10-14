const AsyncQueue = require('./queue');
const queue = new AsyncQueue();

queue.on('enqueued', (item) => {
    console.log('Enqueued: ', item);
});

queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);


queue.start();


queue.on('dequeued', (item) => {
    console.log('Dequeued: ', item);
    console.log('Next At Head:', queue.peek());
});

setTimeout(() => {
    queue.emit('interval', 250);
}, 4000);

setTimeout(() => {
    queue.enqueue(10);
}, 6000);


setTimeout(() => {
    queue.pause();

    queue.enqueue(8);
    queue.enqueue(9);

    console.log(queue.print());

}, 8000);

