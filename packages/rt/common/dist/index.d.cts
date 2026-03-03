export declare const polyfillKeys: {};
export declare const isPolyfillKey: (a: any) => boolean;
export * from "./core_support.cjs";
export declare const hide: <T, K extends keyof T>(object: T, key: K) => void;
export declare function protoChained<T extends object, X extends keyof T, U, Args extends unknown[]>(f: <T2 extends {
    [X2 in X]: any;
}>(t: T2, key: X, ...args: Args) => U, { Reflect, }?: {
    Reflect?: {
        getPrototypeOf: typeof globalThis.Reflect.getPrototypeOf;
        getOwnPropertyDescriptor: typeof globalThis.Reflect.getOwnPropertyDescriptor;
    };
}): (val: T, key: X, ...args: Args) => U;
