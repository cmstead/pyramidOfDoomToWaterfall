'use strict';

const waterfall = require('./waterfall');

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        function finallyAction(error, ...logMessageArgs) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error);
            } else {
                callback(null, logMessageArgs);
            }
        }

        waterfall([
            asyncApi.getNumbers,
            asyncApi.doubleNumbers,
            asyncApi.alwaysFails,
            asyncApi.logMessage
        ], finallyAction);
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;