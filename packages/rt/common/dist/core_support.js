export let deft = null;
export let getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor ?? null;
const getPrototypeOf = Object?.getPrototypeOf ?? null;
export let defineProperty = Object?.defineProperty ?? null;
// export let getOwnPropertyDescriptor;
if (!defineProperty && !getOwnPropertyDescriptor) {
    const prefix = `__SemblePropertyFor__`;
    deft = { prefix };
    defineProperty = (o, k, d) => {
        if (typeof k === "string")
            o[`${prefix}_${k}`] = d;
        if ("value" in d)
            o[k] = d.value;
        return o;
    };
    getOwnPropertyDescriptor = (o, p) => desc(o, p);
}
export function desc(obj, key) {
    if (deft) {
        if (typeof key === "string" && `${deft.prefix}_${key}` in obj)
            return obj[`${deft.prefix}_${key}`];
        if (key in obj)
            return {
                [`${deft.prefix}_value`]: {
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
                let a = getOwnPropertyDescriptor(obj, key);
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
export function descGet(obj, key) {
    if (!deft)
        return obj[key];
    for (;;) {
        let des = desc(obj, key);
        if ("get" in des)
            return des.get();
        [obj, key] = [des, "value"];
    }
}
export function descSet(obj, key, val) {
    if (!deft)
        return (obj[key] = val);
    for (;;) {
        let des = desc(obj, key);
        if ("set" in des)
            return des.set(val), val;
        [obj, key] = [des, "value"];
    }
}
export function setNonEnumerableBaseline(object, key, val, desc = {}) {
    if (deft) {
        return (object[key] = val);
    }
    defineProperty(object, key, {
        writable: true,
        ...desc,
        enumerable: false,
        value: val,
    });
    return val;
}
