import { polyfillKeys } from "@portal-solutions/semble-common";
const defineProperty = Object?.defineProperty;
const getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor;
const symId = '__SembleWeakMap';
export let _WeakMap: typeof WeakMap = 'WeakMap' in globalThis ? globalThis.WeakMap : class WeakMapTemp {
    static __symbol = 'Symbol' in globalThis ? globalThis.Symbol(symId) : symId;
    static __create = 'create' in Object ? Object.create.bind(Object, null) : () => ({});
    static {
        let symbol = this.__symbol;
        polyfillKeys[symbol] = true;
        let create = this.__create;
        for (var a of ['seal', 'freeze','preventExtensions']) {
            if (!(a in Object)) {
                continue
            }; Object[a] = 'Proxy' in globalThis ? (apply => new globalThis.Proxy(Object[a], {
                apply(target, thisArg, argArray) {
                    WeakMapTemp.__get(argArray[0]);
                    return apply(target, thisArg, argArray);
                },
            }))(Reflect.apply.bind(Reflect)) : ((old, b, ...args) => { WeakMapTemp.__get(b); return old(b, ...args) }).bind(null, Object[a].bind(Object))
        }
    }
    static __get(a: any): { [a: string]: any } {
        if (getOwnPropertyDescriptor && defineProperty) {
            const desc = getOwnPropertyDescriptor(a, this.__symbol);
            if (desc) return desc.value;
            const value = WeakMapTemp.__create();
            defineProperty(a, this.__symbol, { value, enumerable: false, writable: true, configurable: false });
            return value;
        }
        if (defineProperty && !(this.__symbol in a)) defineProperty(a, this.__symbol, { value: WeakMapTemp.__create(), enumerable: false, writable: true, configurable: false });
        return (a[this.__symbol] ??= WeakMapTemp.__create())
    }
    id: string;
    constructor() {
        this.id = Math.random() + "";
    };
    delete(o) {
        delete WeakMapTemp.__get(o)[this.id];
    }
    has(o) {
        return this.id in WeakMapTemp.__get(o);
    }
    get(o) {
        return WeakMapTemp.__get(o)[this.id]
    }
    set(o, v) {
        WeakMapTemp.__get(o)[this.id] = v;
    }
} as any;