const chai = require('chai');
const AsyncQueue = require('../queue');
const Promise = require('bluebird');
const should = chai.should();
const sinon = require('sinon');


describe('async_queue', () => {
    let queue;

    beforeEach(() => {
        queue = new AsyncQueue();
    });

    afterEach(() => {
        queue.removeAllListeners();
    });

    it('Should have all the methods in the class', () => {
        ['enqueue', 'getCurrentInterval', 'peek', 'print', 'start', 'pause']
            .forEach(method => {
                queue.should.have.property(method);
            })
    });

    it('Should enqueue the items to the queue', (done) => {
        var onQueueSpy = sinon.spy();
        queue.on('enqueued', onQueueSpy);

        queue.enqueue(1);
        queue.enqueue(2);

        setTimeout(() => {
            onQueueSpy.callCount.should.eql(2);
            done();
        }, 20);

        queue.print().should.eql([1, 2]);
    });

    it('Should return the item at head when peek method is called', () => {
        queue.enqueue(222);
        queue.enqueue(2312);
        queue.enqueue(223222);
        queue.enqueue(1223);

        queue.peek().should.eql(222);

    });

    it('Should start the dequeue process once start method is called', (done) => {
        queue.enqueue(1);
        queue.enqueue(2);

        var onDequeueSpy = sinon.spy();
        queue.on('dequeued', onDequeueSpy);

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(0);
            queue.start();
        }, 260);

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(1);
            done()
        }, 520);
    });

    it('Should dequeue items every 250ms from the queue', (done) => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.start();
        queue.getCurrentInterval().should.eql(250);

        var onDequeueSpy = sinon.spy();
        queue.on('dequeued', onDequeueSpy);

        setTimeout(() => {
            onDequeueSpy.calledOnce.should.be.true;
            onDequeueSpy.firstCall.args[0].should.eql(1);
        }, 260);

        setTimeout(() => {
            onDequeueSpy.calledTwice.should.be.true;
            onDequeueSpy.getCall(1).args[0].should.eql(2);
            done();
        }, 510);

    });


    it('Should update the queue interval', (done) => {
        queue.getCurrentInterval().should.eql(250);
        queue.emit('interval', 20);
        queue.getCurrentInterval().should.eql(20);

        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        var onDequeueSpy = sinon.spy();
        queue.on('dequeued', onDequeueSpy);

        queue.start();

        queue.peek().should.eql(2);

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(3);
            onDequeueSpy.getCall(0).args[0].should.eql(2);
            onDequeueSpy.getCall(1).args[0].should.eql(3);
            onDequeueSpy.getCall(2).args[0].should.eql(4);
            done();
        }, 100);
    });


    it('Should pause the dequeue process', (done) => {

        var onDequeueSpy = sinon.spy();
        queue.on('dequeued', onDequeueSpy);

        queue.start();

        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        queue.pause();

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(0);
            queue.start();
            queue.emit('interval', 50);
        }, 260);

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(1);
            done();
        }, 320);

    });


    it('Should continue to listen for new data even on pausing the dequeue process', (done) => {

        var onDequeueSpy = sinon.spy();
        var onEnqueueSpy = sinon.spy();
        queue.on('dequeued', onDequeueSpy);

        queue.start();

        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        queue.pause();

        setTimeout(() => {
            onDequeueSpy.callCount.should.eql(0);
            queue.start();
            queue.emit('interval', 50);
            queue.on('enqueued', onEnqueueSpy);
            queue.enqueue(95);
            queue.enqueue(110);
        }, 260);

        setTimeout(() => {
            queue.enqueue(221);
            onEnqueueSpy.callCount.should.eql(3);
            onDequeueSpy.callCount.should.eql(1);
            queue.print().should.eql([3, 4, 95, 110, 221]);
            done();
        }, 320);

    });



});
