// import { polyfillKeys } from "@portal-solutions/semble-common";
import {
  isPolyfillKey,
  protoChained as protoChainedCommon,
} from "@portal-solutions/semble-common";
import { descGet, descSet, desc } from "@portal-solutions/semble-common";
export type FactoryOpts = {
  WeakMap?: typeof WeakMap;
  Function?: typeof Function;
  Object?: typeof Object;
};
export default function create(opts: FactoryOpts = {}): {
  Proxy: typeof globalThis.Proxy;
  Reflect: typeof globalThis.Reflect;
  WeakMap: typeof WeakMap;
} {
  const _WeakMap = opts.WeakMap ?? globalThis.WeakMap;
  const { Function = globalThis.Function, Object = globalThis.Object } = opts;
  const oldDefineProperty = Object.defineProperty.bind(Object);
  const _proxyData: WeakMap<any, { object: any; handler: ProxyHandler<any> }> =
    new _WeakMap();

  function protoChained<
    T extends object,
    X extends keyof T,
    U,
    Args extends unknown[]
  >(
    f: <T2 extends { [X2 in X]: any }>(t: T2, key: X, ...args: Args) => U,
    {
      Reflect = _Reflect,
    }: {
      Reflect?: {
        getPrototypeOf: typeof globalThis.Reflect.getPrototypeOf;
        getOwnPropertyDescriptor: typeof globalThis.Reflect.getOwnPropertyDescriptor;
      };
    } = {}
  ): (val: T, key: X, ...args: Args) => U {
    return protoChainedCommon(f, { Reflect });
  }
  let ospo: typeof Reflect.setPrototypeOf;
  const _Reflect: typeof Reflect = {
    apply: Function.prototype.apply.call.bind(Function.prototype.apply),
    construct: (target, args, self) =>
      _proxyData.has(target) && "construct" in _proxyData.get(target)!.handler!
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

    setPrototypeOf: (ospo = ((old, object, proto) => (
      old(object, proto), true
    )).bind(
      null,
      "setPrototypeOf" in Object
        ? Object.setPrototypeOf.bind(Object)
        : (object, proto) => ((object.__proto__ = proto), object)
    )),
  } as any;
  function reflectProp(obj: any, key: keyof any): PropertyDescriptor {
    return {
      get: () => _Reflect.get(obj, key, obj),
      set: (v) => _Reflect.set(obj, key, v, obj),
      enumerable: false,
      configurable: false,
    };
  }
  const _Proxy: typeof Proxy = class ProxyTemp extends Function {
    static __call = Function.prototype.call.call.bind(Function.prototype.call);
    constructor(object, handler: ProxyHandler<any>) {
      if (false) super(); //Obey TS
      const m = ProxyTemp.__create(object, handler);
      ospo(m, ProxyTemp.prototype);
      return m;
    }
    static __link(proxy) {
      const { object } = _proxyData.get(proxy)!;
      for (const prop in object)
        try {
          oldDefineProperty(object, prop, reflectProp(object, prop));
        } catch {}
    }
    static __create(object, handler: ProxyHandler<any>) {
      const fn = function (...args) {
        if (this instanceof fn) {
          if ("construct" in handler) {
            return handler.construct!(object, args, new.target);
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
      ProxyTemp.__link(fn);
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
                    return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
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
                  return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
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
      Function.prototype.toString = new ProxyTemp(Function.prototype.toString, {
        apply(target, thisArg, argArray) {
          while (_proxyData.has(thisArg))
            thisArg = _proxyData.get(thisArg)!.object;
          return _Reflect.apply(target, thisArg, argArray);
        },
      }) as any;
    }
  } as any;
  return { Proxy: _Proxy, Reflect: _Reflect, WeakMap: _WeakMap };
}
