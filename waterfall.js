'use strict';

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

module.exports = waterfall;