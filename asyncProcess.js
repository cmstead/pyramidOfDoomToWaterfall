'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        asyncApi.getNumbers(function (error, ...getNumbersArgs) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error);
            } else {
                asyncApi.doubleNumbers.apply(null, getNumbersArgs.concat([
                    function (error, ...doubleNumbersArgs) {
                        if (error) {
                            logger.log('An error occurred!', error);
                            callback(error);
                        } else {
                            asyncApi.alwaysFails.apply(null, doubleNumbersArgs.concat([
                                function (error, ...alwaysFailsArgs) {
                                    if (error) {
                                        logger.log('An error occurred!', error);
                                        callback(error);
                                    } else {
                                        asyncApi.logMessage.apply(null, alwaysFailsArgs.concat([
                                            function (error, ...logMessageArgs) {
                                                if (error) {
                                                    logger.log('An error occurred!', error);
                                                    callback(error);
                                                } else {
                                                    callback(null, logMessageArgs);
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