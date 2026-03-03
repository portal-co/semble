import { deft } from "./core_support.js";
export const polyfillKeys = {};
const StringCharCodeAt = String.prototype.charCodeAt.call.bind(String.prototype.charCodeAt);
function startsWith(S, needle) {
    var searchStr = `${needle}`;
    // var pos = ToIntegerOrInfinity(arguments.length > 1 ? arguments[1] : undefined);
    // var len = S.length;
    // var start = min(max(pos, 0), len);
    var searchLength = searchStr.length;
    var start = 0;
    // Avoid the `indexOf` call if no match is possible
    // if (searchLength + start > len) return false;
    var index = -1;
    while (++index < searchLength) {
        if (StringCharCodeAt(S, start + index) != StringCharCodeAt(searchStr, index)) {
            return false;
        }
    }
    return true;
}
export const isPolyfillKey = (a) => ((typeof a === "string" || typeof a === "symbol") && a in polyfillKeys) ||
    (deft && startsWith(a, deft.prefix));
export * from "./core_support.js";
export const hide = (function () {
    // check if we're in ES5
    if (typeof Object.getOwnPropertyNames === "function" &&
        !("prototype" in Object.getOwnPropertyNames)) {
        var hidden = { enumerable: false };
        return function (object, key) {
            Object.defineProperty(object, key, hidden);
        };
    }
    // noop for ES3
    return function () { };
})();
export function protoChained(f, { Reflect = {
    getPrototypeOf: Object?.getPrototypeOf,
    getOwnPropertyDescriptor: Object?.getOwnPropertyDescriptor,
}, } = {}) {
    return (val, key, ...args) => {
        for (;;) {
            if (val === null) {
                throw val[key]; //Throws before the `throw` statement
            }
            if (Reflect.getOwnPropertyDescriptor(val, key)) {
                return f(val, key, ...args);
            }
            val = Reflect.getPrototypeOf(val); //Simulate tail recursion
        }
    };
}
