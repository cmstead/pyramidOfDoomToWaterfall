'use strict';

function asyncProcess(asyncApi, logger) {

    function errorOrNext(nextFunction, callback) {
        return function (error, ...args) {
            if (error) {
                callback(error);
            } else {
                nextFunction.apply(null, args.concat([callback]));
            }
        }
    }

    function waterfall(asyncFunctions, finallyFunction) {
        return asyncFunctions
            .slice(0)
            .reverse(0)
            .reduce(function (compositeFunction, nextFunction) {
                return errorOrNext(nextFunction, compositeFunction);
            }, finallyFunction);
    }

    function doAsyncStuff(callback) {
        let lastState = null;

        function finishAsyncProcess(error, ...args) {
            if (error) {
                logger.log('An error occurred!', error);
            }

            callback(error, lastState);
        }

        const logMessage = errorOrNext(asyncApi.logMessage, finishAsyncProcess);
        const alwaysFails = errorOrNext(asyncApi.alwaysFails, logMessage);
        const doubleNumbers = errorOrNext(asyncApi.doubleNumbers, alwaysFails);

        asyncApi.getNumbers(doubleNumbers);
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;