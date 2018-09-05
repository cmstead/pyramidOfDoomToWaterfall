'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        let lastState = null;

        asyncApi.getNumbers(function (error, ...getNumbersArgs) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error, lastState);
            } else {
                lastState = getNumbersArgs;

                asyncApi.doubleNumbers.apply(null, getNumbersArgs.concat([
                    function (error, ...doubleNumbersArgs) {
                        if (error) {
                            logger.log('An error occurred!', error);
                            callback(error, lastState);
                        } else {
                            lastState = doubleNumbersArgs;

                            asyncApi.alwaysFails.apply(null, doubleNumbersArgs.concat([
                                function (error, ...alwaysFailsArgs) {
                                    if (error) {
                                        logger.log('An error occurred!', error);
                                        callback(error, lastState);
                                    } else {
                                        lastState = alwaysFailsArgs;

                                        asyncApi.logMessage.apply(null, alwaysFailsArgs.concat([
                                            function (error, ...logMessageArgs) {
                                                if (error) {
                                                    logger.log('An error occurred!', error);
                                                    callback(error, lastState);
                                                } else {
                                                    lastState = logMessageArgs;

                                                    callback(null, lastState);
                                                }
                                            }
                                        ]));
                                    }
                                }
                            ]));
                        }
                    }
                ]));
            }
        });
    }

    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;