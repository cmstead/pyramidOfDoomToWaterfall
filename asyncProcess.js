'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        let lastState = null;

        function handleErrorCase(error) {
            logger.log('An error occurred!', error);
            callback(error, lastState);
        }

        function finishAsyncProcess(error, ...args) {
            if (error) {
                handleErrorCase(error)
            } else {
                callback(null, lastState);
            }
        }

        function logMessage(error, ...args) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error, lastState);
            } else {
                asyncApi.logMessage(finishAsyncProcess);
            }
        }

        function alwaysFails(error, ...args) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error, lastState);
            } else {
                asyncApi.alwaysFails(logMessage);
            }
        }

        function doubleNumbers(error, ...args) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error, lastState);
            } else {
                asyncApi.doubleNumbers(alwaysFails);
            }
        }

        asyncApi.getNumbers(doubleNumbers);
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;