interface Deft {
    prefix: string;
}
export let deft: Deft | null;
export let getOwnPropertyDescriptor: (o: any, p: PropertyKey) => PropertyDescriptor | undefined;
export let defineProperty: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
export function desc<T extends object, K extends keyof T>(obj: T, key: K): PropertyDescriptor;
export function descGet<T extends object, K extends keyof T>(obj: T, key: K): T[K];
export function descSet<T extends object, K extends keyof T>(obj: T, key: K, val: T[K]): T[K];
export function setNonEnumerableBaseline<T extends object, K extends keyof T>(object: T, key: K, val: T[K], desc?: PropertyDescriptor): T[K];
export const polyfillKeys: {};
export const isPolyfillKey: (a: any) => boolean;
export const hide: <T, K extends keyof T>(object: T, key: K) => void;
export function protoChained<T extends object, X extends keyof T, U, Args extends unknown[]>(f: <T2 extends {
    [X2 in X]: any;
}>(t: T2, key: X, ...args: Args) => U, { Reflect, }?: {
    Reflect?: {
        getPrototypeOf: typeof globalThis.Reflect.getPrototypeOf;
        getOwnPropertyDescriptor: typeof globalThis.Reflect.getOwnPropertyDescriptor;
    };
}): (val: T, key: X, ...args: Args) => U;

//# sourceMappingURL=index.d.ts.map
