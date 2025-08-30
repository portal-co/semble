import { polyfillKeys } from "@portal-solutions/semble-common";
type _Reflect = typeof Reflect;
export default function create({ polyfillKeys, symId, defineProperty, getOwnPropertyDescriptor, Reflect, ...globalThis }?: {
    polyfillKeys?: typeof polyfillKeys;
    symId?: string;
    Symbol?: undefined | typeof Symbol;
    Proxy?: undefined | typeof Proxy;
    Reflect?: undefined | _Reflect;
    defineProperty?: undefined | typeof Object.defineProperty;
    getOwnPropertyDescriptor?: undefined | typeof Object.getOwnPropertyDescriptor;
}): typeof WeakMap;

//# sourceMappingURL=index.d.ts.map
