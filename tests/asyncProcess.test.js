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

        sinon.spy(asyncApi, 'alwaysFails');
        sinon.spy(asyncApi, 'logMessage');

        doAsyncStuff = asyncProcess(asyncApi, loggerFake).doAsyncStuff;
    });

    it('Gets numbers, doubles them and then fails', function (done) {
        doAsyncStuff(function (error, data) {
            const alwaysFailsArgs = asyncApi.alwaysFails.args[0];
            const stateBeforeFailure = alwaysFailsArgs.slice(0, alwaysFailsArgs.length - 1);

            assert.equal(JSON.stringify(stateBeforeFailure), '[2,4,6,8,10]');

            assert.equal(asyncApi.logMessage.callCount, 0);
            
            assert.equal(error.message, 'I always fail! Why did you call me?');

            assert.equal(loggerFake.log.callCount, 1);
            assert.equal(loggerFake.log.args[0][0], 'An error occurred!');
            assert.equal(loggerFake.log.args[0][1].message, 'I always fail! Why did you call me?');

            done();
        });
    });
});