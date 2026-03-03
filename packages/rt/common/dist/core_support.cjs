"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineProperty = exports.getOwnPropertyDescriptor = exports.deft = void 0;
exports.desc = desc;
exports.descGet = descGet;
exports.descSet = descSet;
exports.setNonEnumerableBaseline = setNonEnumerableBaseline;
exports.deft = null;
exports.getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor ?? null;
const getPrototypeOf = Object?.getPrototypeOf ?? null;
exports.defineProperty = Object?.defineProperty ?? null;
// export let getOwnPropertyDescriptor;
if (!exports.defineProperty && !exports.getOwnPropertyDescriptor) {
    const prefix = `__SemblePropertyFor__`;
    exports.deft = { prefix };
    exports.defineProperty = (o, k, d) => {
        if (typeof k === "string")
            o[`${prefix}_${k}`] = d;
        if ("value" in d)
            o[k] = d.value;
        return o;
    };
    exports.getOwnPropertyDescriptor = (o, p) => desc(o, p);
}
function desc(obj, key) {
    if (exports.deft) {
        if (typeof key === "string" && `${exports.deft.prefix}_${key}` in obj)
            return obj[`${exports.deft.prefix}_${key}`];
        if (key in obj)
            return {
                [`${exports.deft.prefix}_value`]: {
                    get() {
                        return obj[key];
                    },
                    set(v) {
                        obj[key] = v;
                    },
                },
            };
        return null;
    }
    else {
        if (key in obj) {
            for (;;) {
                let a = (0, exports.getOwnPropertyDescriptor)(obj, key);
                if (a)
                    return a;
                obj = getPrototypeOf(obj);
                if (obj === null)
                    return null;
            }
        }
        else {
            return null;
        }
    }
}
function descGet(obj, key) {
    if (!exports.deft)
        return obj[key];
    for (;;) {
        let des = desc(obj, key);
        if ("get" in des)
            return des.get();
        [obj, key] = [des, "value"];
    }
}
function descSet(obj, key, val) {
    if (!exports.deft)
        return (obj[key] = val);
    for (;;) {
        let des = desc(obj, key);
        if ("set" in des)
            return des.set(val), val;
        [obj, key] = [des, "value"];
    }
}
function setNonEnumerableBaseline(object, key, val, desc = {}) {
    if (exports.deft) {
        return (object[key] = val);
    }
    (0, exports.defineProperty)(object, key, {
        writable: true,
        ...desc,
        enumerable: false,
        value: val,
    });
    return val;
}
