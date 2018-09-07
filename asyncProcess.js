'use strict';

function asyncProcess(asyncApi, logger) {

    function errorOrNextAction(nextAction, callback) {
        return function (error, ...args) {
            if (error) {
                callback(error);
            } else {
                nextAction.apply(null, args.concat([callback]));
            }
        }
    }

    function composeAsync(asyncActions, finallyFunction) {
        return asyncActions
            .slice(0)
            .reverse()
            .reduce(function(compositeFunction, nextAction){
                return errorOrNextAction(nextAction, compositeFunction);
            }, finallyFunction);
    }

    function waterfall(asyncActions, finallyFunction) {
        composeAsync(asyncActions, finallyFunction)();
    }

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