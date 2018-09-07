'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        function handleError(error) {
            logger.log('An error occurred!', error);
            callback(error);
        }

        function errorOrNextAction(nextAction, callback) {
            return function(error, ...args) {
                if(error) {
                    callback(error);
                } else {
                    nextAction.apply(null, args.concat([callback]));
                }
            }
        }

        function finallyAction(error, ...logMessageArgs) {
            if (error) {
                handleError(error);
            } else {
                callback(null, logMessageArgs);
            }
        }

        const errorOrLogMessage = errorOrNextAction(asyncApi.logMessage, finallyAction);
        const errorOrAlwaysFails = errorOrNextAction(asyncApi.alwaysFails, errorOrLogMessage);
        const errorOrDoubleNumbers = errorOrNextAction(asyncApi.doubleNumbers, errorOrAlwaysFails);

        asyncApi.getNumbers(errorOrDoubleNumbers);
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;