import { polyfillKeys } from "@portal-solutions/semble-common";
type _Reflect = typeof Reflect;
export type FactoryOpts = {
    polyfillKeys?: typeof polyfillKeys;
    symId?: string;
    Symbol?: undefined | typeof globalThis.Symbol;
    Proxy?: undefined | typeof globalThis.Proxy;
    Reflect?: undefined | _Reflect;
    defineProperty?: undefined | typeof Object.defineProperty;
    getOwnPropertyDescriptor?: undefined | typeof Object.getOwnPropertyDescriptor;
    Object?: typeof globalThis.Object;
};
export default function create({ polyfillKeys, symId, defineProperty, getOwnPropertyDescriptor, Reflect, Proxy, Symbol, Object, }?: FactoryOpts): typeof WeakMap;

//# sourceMappingURL=index.d.ts.map
