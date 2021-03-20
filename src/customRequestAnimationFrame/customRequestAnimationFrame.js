'use strict';

/**
 * 
 * @param callbackQueues
 * @param callbackListId
 * @returns {*[]|*}
 */
function initializeCallbackQueue(callbackQueues, callbackListId) {
    if (!callbackQueues[callbackListId]) {
        return callbackQueues[callbackListId] = [];
    }
    
    return callbackQueues;
}

export default (function() {
    const REFRESH_TIME = 1000; // default to one second
    const DEFAULT_REFRESH_LIMIT = 60; // default to browser 60 callbacks per second
    let callbackId = 0;
    let currentTime = 0;
    let callbacks = {};
    let setTimeoutId;

    return function (callback, delay = 0) {
        callbackId++;
        currentTime = new Date().getTime();

        initializeCallbackQueue(callbacks, callbackId);
        callbacks[callbackId].push({ callback, delay });

        // TODO:
        //  1) Fill queue based on criteria
        //  2) Figure out delay criteria
        //  3) Iterate through and execute queue based on criteria
        setTimeoutId = setTimeout(() => {
            // Iterate through queue, account for tick delay
            callback(currentTime);
            // clear queue
        }, REFRESH_TIME);

        return callbackId;
    }
})();