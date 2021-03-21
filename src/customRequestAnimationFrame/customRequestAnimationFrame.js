'use strict';

/**
 * Helper method to scope async callback stack.
 * @param handler - the method to be executed within setTimeout.
 * @param delayLength - the 'tick' length that will pass before method executed.
 */
function setDelay(handler, delayLength) {
    return setTimeout(handler, delayLength);
}

export default (function() {
    let callbackId = 0;
    let currentTime = 0;
    let callbacksQueue = [];
    let delayQueue = [];

    return function (callback, delay = 0) {
        const currentId = callbackId
        currentTime = new Date().getTime();

        callbacksQueue.push({ CURRENT_ID: currentId, currentTime, callback, delay });

        try {
            callbacksQueue.forEach((item, index) => {
                if (item.delay > 0) {
                    delayQueue.push({ CURRENT_ID: currentId, currentTime, callback, delay });
                    callbacksQueue.splice(index, 1);
                    return;
                }
                item.callback(currentTime);
                // remove item after called.
                callbacksQueue.splice(index, 1);
            });

            delayQueue.forEach((item, index) => {
                setDelay(() => item.callback(item.currentTime), delay);
                // remove item after called.
                delayQueue.splice(index, 1);
            })

            // Iterate callback id after invocation.
            callbackId++;
        } catch(err) {
            /**
             * Ignore error per [w3c editor's draft invoke callback algorithm]
             * {@link https://www.w3.org/TR/animation-timing/#dfn-invoke-callbacks-algorithm}
             */
            console.error(err);
        }
        return currentId;
    }
})();