const $a131fa01916a4957$export$6ff5fd5b618947f0 = {};
const $a131fa01916a4957$export$2cf60a7ba5fdc250 = (potentialKey)=>(typeof potentialKey === "string" || typeof potentialKey === "symbol") && potentialKey in $a131fa01916a4957$export$6ff5fd5b618947f0;
const $a131fa01916a4957$export$fe8985bb6374093c = function() {
    // check if we're in ES5
    if (typeof Object.getOwnPropertyNames === 'function' && !('prototype' in Object.getOwnPropertyNames)) {
        var hidden = {
            enumerable: false
        };
        return function(object, key) {
            Object.defineProperty(object, key, hidden);
        };
    }
    // noop for ES3
    return function() {};
}();


export {$a131fa01916a4957$export$6ff5fd5b618947f0 as polyfillKeys, $a131fa01916a4957$export$2cf60a7ba5fdc250 as isPolyfillKey, $a131fa01916a4957$export$fe8985bb6374093c as hide};
//# sourceMappingURL=index.js.map
