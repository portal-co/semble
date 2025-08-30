import { _WeakMap } from "@portal-solutions/semble-weak-map";
// import { polyfillKeys } from "@portal-solutions/semble-common";
import { isPolyfillKey } from "@portal-solutions/semble-common";
import { descGet, descSet, desc } from "@portal-solutions/semble-common";

const _proxyData: WeakMap<any, { object: any; handler: ProxyHandler<any> }> =
  new _WeakMap();

function protoChained<
  T extends object,
  X extends keyof T,
  U,
  Args extends unknown[]
>(
  f: <T2 extends { [X2 in X]: any }>(t: T2, key: X, ...args: Args) => U,
  { Reflect = _Reflect }: { Reflect?: typeof _Reflect } = {}
): (val: T, key: X, ...args: Args) => U {
  return (val, key, ...args) => {
    for (;;) {
      if (val === null) {
        throw val[key]; //Throws before the `throw` statement
      }
      if (Reflect.getOwnPropertyDescriptor(val, key)) {
        return f(val, key, ...args);
      }
      val = Reflect.getPrototypeOf(val) as T; //Simulate tail recursion
    }
  };
}

export const _Reflect: typeof Reflect =
  "Reflect" in globalThis
    ? globalThis.Reflect
    : ({
        apply: Function.prototype.apply.call.bind(Function.prototype.apply),
        construct: (target, args, self) =>
          _proxyData.has(target) &&
          "construct" in _proxyData.get(target)!.handler!
            ? _proxyData.get(target)!.handler.construct!(
                _proxyData.get(target)!.object,
                args,
                self
              )
            : target === self
            ? new target(...args)
            : _Reflect.apply(target, self, args),
        get: protoChained((object, key) =>
          _proxyData.has(object) &&
          "get" in _proxyData.get(object)!.handler &&
          !isPolyfillKey(key)
            ? _proxyData.get(object)!.handler.get!(
                _proxyData.get(object)!.object,
                key,
                object
              )
            : descGet(object, key)
        ),
        set: protoChained((object, key, value) =>
          _proxyData.has(object) &&
          "set" in _proxyData.get(object)!.handler &&
          !isPolyfillKey(key)
            ? _proxyData.get(object)!.handler.set!(
                _proxyData.get(object)!.object,
                key,
                value,
                object
              )
            : (descSet(object, key, value as any), true)
        ),
        has: protoChained((object, key) =>
          _proxyData.has(object) &&
          "has" in _proxyData.get(object)!.handler &&
          !isPolyfillKey(key)
            ? _proxyData.get(object)!.handler.has!(
                _proxyData.get(object)!.object,
                key
              )
            : desc(object, key) !== null
        ),

        setPrototypeOf: ((old, object, proto) => (
          old(object, proto), true
        )).bind(
          null,
          "setPrototypeOf" in Object
            ? Object.setPrototypeOf.bind(Object)
            : (object, proto) => ((object.__proto__ = proto), object)
        ),
      } as any);
export const _Proxy: typeof Proxy =
  "Proxy" in globalThis
    ? globalThis.Proxy
    : (class ProxyTemp extends Function {
        static __call = Function.prototype.call.call.bind(
          Function.prototype.call
        );
        constructor(object, handler: ProxyHandler<any>) {
          if (false) super(); //Obey TS
          const m = ProxyTemp.__create(object, handler);
          _Reflect.setPrototypeOf(m, ProxyTemp.prototype);
          return m;
        }
        static __create(object, handler: ProxyHandler<any>) {
          const fn = function (...args) {
            if (this instanceof fn) {
              if ("construct" in handler) {
                return handler.construct!(object, args, this);
              }
              return new object(...args);
            } else {
              if ("apply" in handler) {
                return handler.apply!(object, this, args);
              }
              return ProxyTemp.__call(object, this, ...args);
            }
          };
          _proxyData.set(fn, { object, handler });
          return fn;
        }
        static {
          for (const trap of [
            "defineProperty",
            "getOwnPropertyDescriptor",
            "getOwnPropertyDescriptors",
            "freeze",
            "seal",
            "preventExtensions",
            "getPrototypeOf",
            "setPrototypeOf",
          ]) {
            if (trap in Object) {
              _Reflect[trap] = new ProxyTemp(
                trap in _Reflect ? _Reflect[trap] : Object[trap].bind(Object),
                {
                  apply(target, self, args) {
                    if (_proxyData.has(args[0])) {
                      if (trap in _proxyData.get(args[0])?.handler!) {
                        return _proxyData
                          .get(args[0])
                          ?.handler?.[trap]?.(...args);
                      } else {
                        args[0] = _proxyData.get(args[0])!.object;
                        return _Reflect.apply(target, self, args);
                      }
                    } else {
                      return _Reflect.apply(target, self, args);
                    }
                  },
                }
              );
              Object[trap] = new ProxyTemp(Object[trap], {
                apply(target, self, args) {
                  if (_proxyData.has(args[0])) {
                    if (trap in _proxyData.get(args[0])?.handler!) {
                      return _proxyData
                        .get(args[0])
                        ?.handler?.[trap]?.(...args);
                    } else {
                      args[0] = _proxyData.get(args[0])!.object;
                      return _Reflect.apply(target, self, args);
                    }
                  } else {
                    return _Reflect.apply(target, self, args);
                  }
                },
              });
            }
          }
          Function.prototype.toString = new ProxyTemp(
            Function.prototype.toString,
            {
              apply(target, thisArg, argArray) {
                while (_proxyData.has(thisArg))
                  thisArg = _proxyData.get(thisArg)!.object;
                return _Reflect.apply(target, thisArg, argArray);
              },
            }
          ) as any;
        }
      } as any);
