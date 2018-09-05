'use strict';

const nullError = null;

function getNumbers(continuation) {
    setTimeout(function () {
        continuation(nullError, 1, 2, 3, 4, 5);
    }, 50);
}

function doubleNumbers(...args) {
    setTimeout(function () {
        const continuation = args.pop();
        const doubledNumbers = args.map(x => x * 2);

        continuation.apply(null, [nullError].concat(doubledNumbers));
    }, 50);
}

function alwaysFails(...args) {
    setTimeout(function () {
        const continuation = args.pop();

        continuation(new Error('I always fail! Why did you call me?'), null);
    }, 50);
}

function logMessage(...args) {
    setTimeout(function () {
        const continuation = args.pop();

        console.log('Here are some numbers: ', args);

        continuation(nullError);
    }, 50);
}

module.exports = {
    logMessage: logMessage,
    alwaysFails: alwaysFails,
    doubleNumbers: doubleNumbers,
    getNumbers: getNumbers
};