'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        function handleError(error) {
            logger.log('An error occurred!', error);
            callback(error);
        }

        function finallyAction(error, ...logMessageArgs) {
            if (error) {
                handleError(error);
            } else {
                callback(null, logMessageArgs);
            }
        }

        function errorOrLogMessage(error, ...alwaysFailsArgs) {
            if (error) {
                handleError(error);
            } else {
                asyncApi.logMessage.apply(null, alwaysFailsArgs.concat([
                    finallyAction
                ]));
            }
        }

        function errorOrAlwaysFails(error, ...doubleNumbersArgs) {
            if (error) {
                handleError(error);
            } else {
                asyncApi.alwaysFails.apply(null, doubleNumbersArgs.concat([
                    errorOrLogMessage
                ]));
            }
        }

        function errorOrDoubleNumbers(error, ...getNumbersArgs) {
            if (error) {
                handleError(error);
            } else {
                asyncApi.doubleNumbers.apply(null, getNumbersArgs.concat([
                    errorOrAlwaysFails
                ]));
            }
        }

        asyncApi.getNumbers(errorOrDoubleNumbers);
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;