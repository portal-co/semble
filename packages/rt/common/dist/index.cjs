"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hide = exports.isPolyfillKey = exports.polyfillKeys = void 0;
exports.protoChained = protoChained;
const core_support_ts_1 = require("./core_support.cjs");
exports.polyfillKeys = {};
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
const isPolyfillKey = (a) => ((typeof a === "string" || typeof a === "symbol") && a in exports.polyfillKeys) ||
    (core_support_ts_1.deft && startsWith(a, core_support_ts_1.deft.prefix));
exports.isPolyfillKey = isPolyfillKey;
__exportStar(require("./core_support.cjs"), exports);
exports.hide = (function () {
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
function protoChained(f, { Reflect = {
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
