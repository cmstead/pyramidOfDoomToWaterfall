'use strict';

function asyncProcess(asyncApi, logger) {

    function doAsyncStuff(callback) {
        let lastState = null;
        asyncApi.getNumbers(function (error, ...args) {
            if (error) {
                logger.log('An error occurred!', error);
                callback(error, lastState);
            } else {
                asyncApi.doubleNumbers(function (error, ...args) {
                    if (error) {
                        logger.log('An error occurred!', error);
                        callback(error, lastState);
                    } else {
                        asyncApi.alwaysFails(function (error, ...args) {
                            if (error) {
                                logger.log('An error occurred!', error);
                                callback(error, lastState);
                            } else {
                                asyncApi.logMessage(function (error, ...args) {
                                    if (error) {
                                        logger.log('An error occurred!', error);
                                        callback(error, lastState);
                                    } else {
                                        callback(null, lastState);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    
    return {
        doAsyncStuff: doAsyncStuff
    };
}

module.exports = asyncProcess;