'use strict';

const { assert } = require('chai');
const sinon = require('sinon');

const asyncApi = require('../asyncApi');
const asyncProcess = require('../asyncProcess');

describe('Async Process: doAsyncStuff', function () {
    let doAsyncStuff;
    let loggerFake;

    beforeEach(function () {
        loggerFake = {
            log: sinon.spy()
        };

        doAsyncStuff = asyncProcess(asyncApi, loggerFake).doAsyncStuff;
    });

    it('Gets numbers, doubles them and then fails', function (done) {
        doAsyncStuff(function (error, data) {
            assert.equal(error.message, 'I always fail! Why did you call me?');
            assert.equal(JSON.stringify(data), '[2,4,6,8,10]');

            assert.equal(loggerFake.log.callCount, 1);
            assert.equal(loggerFake.log.args[0][0], 'An error occurred!');
            assert.equal(loggerFake.log.args[0][1].message, 'I always fail! Why did you call me?');

            done();
        });
    });
});