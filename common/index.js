
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $5bff4b337e0e342d$exports = {};

$parcel$export($5bff4b337e0e342d$exports, "deft", () => $5bff4b337e0e342d$export$fdbdd9d842f2999e);
$parcel$export($5bff4b337e0e342d$exports, "getOwnPropertyDescriptor", () => $5bff4b337e0e342d$export$b6b8a7926c5f8342);
$parcel$export($5bff4b337e0e342d$exports, "defineProperty", () => $5bff4b337e0e342d$export$fdab3c20aae16ddf);
$parcel$export($5bff4b337e0e342d$exports, "desc", () => $5bff4b337e0e342d$export$51987bb50e1f6752);
$parcel$export($5bff4b337e0e342d$exports, "descGet", () => $5bff4b337e0e342d$export$f84074484b0666be);
$parcel$export($5bff4b337e0e342d$exports, "descSet", () => $5bff4b337e0e342d$export$2cd2c4e1dae73ff9);
$parcel$export($5bff4b337e0e342d$exports, "setNonEnumerableBaseline", () => $5bff4b337e0e342d$export$9493004cc2642ffa);
let $5bff4b337e0e342d$export$fdbdd9d842f2999e = null;
let $5bff4b337e0e342d$export$b6b8a7926c5f8342 = Object?.getOwnPropertyDescriptor ?? null;
const $5bff4b337e0e342d$var$getPrototypeOf = Object?.getPrototypeOf ?? null;
let $5bff4b337e0e342d$export$fdab3c20aae16ddf = Object?.defineProperty ?? null;
// export let getOwnPropertyDescriptor;
if (!$5bff4b337e0e342d$export$fdab3c20aae16ddf && !$5bff4b337e0e342d$export$b6b8a7926c5f8342) {
    const prefix = `__SemblePropertyFor__`;
    $5bff4b337e0e342d$export$fdbdd9d842f2999e = {
        prefix: prefix
    };
    $5bff4b337e0e342d$export$fdab3c20aae16ddf = (o, k, d)=>{
        if (typeof k === "string") o[`${prefix}_${k}`] = d;
        if ("value" in d) o[k] = d.value;
        return o;
    };
    $5bff4b337e0e342d$export$b6b8a7926c5f8342 = (o, p)=>$5bff4b337e0e342d$export$51987bb50e1f6752(o, p);
}
function $5bff4b337e0e342d$export$51987bb50e1f6752(obj, key) {
    if ($5bff4b337e0e342d$export$fdbdd9d842f2999e) {
        if (typeof key === "string" && `${$5bff4b337e0e342d$export$fdbdd9d842f2999e.prefix}_${key}` in obj) return obj[`${$5bff4b337e0e342d$export$fdbdd9d842f2999e.prefix}_${key}`];
        if (key in obj) return {
            [`${$5bff4b337e0e342d$export$fdbdd9d842f2999e.prefix}_value`]: {
                get () {
                    return obj[key];
                },
                set (v) {
                    obj[key] = v;
                }
            }
        };
        return null;
    } else {
        if (key in obj) for(;;){
            let a = $5bff4b337e0e342d$export$b6b8a7926c5f8342(obj, key);
            if (a) return a;
            obj = $5bff4b337e0e342d$var$getPrototypeOf(obj);
            if (obj === null) return null;
        }
        else return null;
    }
}
function $5bff4b337e0e342d$export$f84074484b0666be(obj, key) {
    if (!$5bff4b337e0e342d$export$fdbdd9d842f2999e) return obj[key];
    for(;;){
        let des = $5bff4b337e0e342d$export$51987bb50e1f6752(obj, key);
        if ("get" in des) return des.get();
        [obj, key] = [
            des,
            "value"
        ];
    }
}
function $5bff4b337e0e342d$export$2cd2c4e1dae73ff9(obj, key, val) {
    if (!$5bff4b337e0e342d$export$fdbdd9d842f2999e) return obj[key] = val;
    for(;;){
        let des = $5bff4b337e0e342d$export$51987bb50e1f6752(obj, key);
        if ("set" in des) return des.set(val), val;
        [obj, key] = [
            des,
            "value"
        ];
    }
}
function $5bff4b337e0e342d$export$9493004cc2642ffa(object, key, val, desc = {}) {
    if ($5bff4b337e0e342d$export$fdbdd9d842f2999e) return object[key] = val;
    $5bff4b337e0e342d$export$fdab3c20aae16ddf(object, key, {
        writable: true,
        ...desc,
        enumerable: false,
        value: val
    });
    return val;
}


const $a131fa01916a4957$export$6ff5fd5b618947f0 = {};
const $a131fa01916a4957$var$StringCharCodeAt = String.prototype.charCodeAt.call.bind(String.prototype.charCodeAt);
function $a131fa01916a4957$var$startsWith(S, needle) {
    var searchStr = `${needle}`;
    // var pos = ToIntegerOrInfinity(arguments.length > 1 ? arguments[1] : undefined);
    // var len = S.length;
    // var start = min(max(pos, 0), len);
    var searchLength = searchStr.length;
    var start = 0;
    // Avoid the `indexOf` call if no match is possible
    // if (searchLength + start > len) return false;
    var index = -1;
    while(++index < searchLength){
        if ($a131fa01916a4957$var$StringCharCodeAt(S, start + index) != $a131fa01916a4957$var$StringCharCodeAt(searchStr, index)) return false;
    }
    return true;
}
const $a131fa01916a4957$export$2cf60a7ba5fdc250 = (a)=>(typeof a === "string" || typeof a === "symbol") && a in $a131fa01916a4957$export$6ff5fd5b618947f0 || (0, $5bff4b337e0e342d$export$fdbdd9d842f2999e) && $a131fa01916a4957$var$startsWith(a, (0, $5bff4b337e0e342d$export$fdbdd9d842f2999e).prefix);
const $a131fa01916a4957$export$fe8985bb6374093c = function() {
    // check if we're in ES5
    if (typeof Object.getOwnPropertyNames === "function" && !("prototype" in Object.getOwnPropertyNames)) {
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


export {$a131fa01916a4957$export$6ff5fd5b618947f0 as polyfillKeys, $a131fa01916a4957$export$2cf60a7ba5fdc250 as isPolyfillKey, $a131fa01916a4957$export$fe8985bb6374093c as hide, $5bff4b337e0e342d$export$fdbdd9d842f2999e as deft, $5bff4b337e0e342d$export$b6b8a7926c5f8342 as getOwnPropertyDescriptor, $5bff4b337e0e342d$export$fdab3c20aae16ddf as defineProperty, $5bff4b337e0e342d$export$51987bb50e1f6752 as desc, $5bff4b337e0e342d$export$f84074484b0666be as descGet, $5bff4b337e0e342d$export$2cd2c4e1dae73ff9 as descSet, $5bff4b337e0e342d$export$9493004cc2642ffa as setNonEnumerableBaseline};
//# sourceMappingURL=index.js.map
