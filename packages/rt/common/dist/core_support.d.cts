interface Deft {
    prefix: string;
}
export declare let deft: Deft | null;
export declare let getOwnPropertyDescriptor: (o: any, p: PropertyKey) => PropertyDescriptor | undefined;
export declare let defineProperty: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
export declare function desc<T extends object, K extends keyof T>(obj: T, key: K): PropertyDescriptor;
export declare function descGet<T extends object, K extends keyof T>(obj: T, key: K): T[K];
export declare function descSet<T extends object, K extends keyof T>(obj: T, key: K, val: T[K]): T[K];
export declare function setNonEnumerableBaseline<T extends object, K extends keyof T>(object: T, key: K, val: T[K], desc?: PropertyDescriptor): T[K];
export {};
