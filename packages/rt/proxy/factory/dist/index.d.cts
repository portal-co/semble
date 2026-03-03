export type FactoryOpts = {
    WeakMap?: typeof WeakMap;
    Function?: typeof Function;
    Object?: typeof Object;
};
declare function create(opts?: FactoryOpts): {
    Proxy: typeof globalThis.Proxy;
    Reflect: typeof globalThis.Reflect;
    WeakMap: typeof WeakMap;
};
export = create;
