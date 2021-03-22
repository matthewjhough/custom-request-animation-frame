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
            try {
                for (let callbackId in callbacksQueue) {
                    const item = callbacksQueue[callbackId];
                    currentCallback = callbacksQueue[callbackId].callback;
                    if (item.delay > 0) {
                        setDelay(() => currentCallback(last), item.delay);
                        // remove item after called.
                        delete callbacksQueue[callbackId];
                        return;
                    }

                    currentCallback(last);
                    // remove item after called.
                    delete callbacksQueue[callbackId];
                }

                // Iterate callback id after invocation.
                callbackId++;
            } catch(err) {
                /**
                 * Ignore error per [w3c specification invoke callback algorithm]
                 * {@link https://www.w3.org/TR/animation-timing/#dfn-invoke-callbacks-algorithm}
                 */
                console.error(err);
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