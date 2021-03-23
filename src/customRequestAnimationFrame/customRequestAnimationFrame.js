'use strict';

/**
 * Helper method to scope async callback stack; which will ensure the desired
 * amount of executions.
 * @param handler - the method to be executed within setTimeout.
 * @param delayLength - the 'tick' length that will pass before method executed.
 */
function setDelay(handler, delayLength) {
    return setTimeout(handler, delayLength);
}

/**
 * Helper method to invoke callback with error handling.
 * @param currentCallback
 * @param last
 */
function invokeCallback(currentCallback, last) {
    try {
        currentCallback(last);
    } catch(err) {
        /**
         * Ignore error per [w3c specification invoke callback algorithm]
         * {@link https://www.w3.org/TR/animation-timing/#dfn-invoke-callbacks-algorithm}
         */
        console.error(err);
    }
}

export default (function() {
    let callbackId = 0;
    let now = 0;
    let last = 0;
    let callbacksQueue = {};
    const frames = 1000 / 60

    return function (callback, delay = 0) {
        now = performance.now();
        let currentCallback;
        let currentCallbackId = callbackId;
        let next = Math.max(0, frames - (now - last));
        last = now + next;

        setDelay(() => {
            for (let id in callbacksQueue) {
                const item = callbacksQueue[id];
                currentCallback = callbacksQueue[id].callback;
                if (item.delay > 0) {
                    setDelay(() => {
                        invokeCallback(currentCallback, last);
                    }, item.delay);
                    // remove item after called.
                    delete callbacksQueue[id];
                    return;
                }

                invokeCallback(currentCallback, last);
                // remove item after called.
                delete callbacksQueue[id];
                id++;
            }
        },
        next);

        callbacksQueue[currentCallbackId] = {
            callbackId: currentCallbackId,
            currentTime: now,
            callback,
            delay
        };

        callbackId++;
        return currentCallbackId;
    }
})();