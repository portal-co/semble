export const polyfillKeys = {};
export const isPolyfillKey = potentialKey => (typeof potentialKey === "string" || typeof potentialKey === "symbol") && potentialKey in polyfillKeys;
export const hide: <T, K extends keyof T>(object: T, key: K) => void = (function () {
    // check if we're in ES5
    if (typeof Object.getOwnPropertyNames === 'function' && !('prototype' in Object.getOwnPropertyNames)) {
        var hidden = { enumerable: false };

        return function (object, key) {
            Object.defineProperty(object, key, hidden);
        };
    }

    // noop for ES3
    return function () { };
})();