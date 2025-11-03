import {protoChained as $abDdz$protoChained, isPolyfillKey as $abDdz$isPolyfillKey, descGet as $abDdz$descGet, descSet as $abDdz$descSet, desc as $abDdz$desc} from "@portal-solutions/semble-common";

// import { polyfillKeys } from "@portal-solutions/semble-common";

function $aaee49ddaa217a0d$export$2e2bcd8739ae039(opts = {}) {
    const _WeakMap = opts.WeakMap ?? globalThis.WeakMap;
    const { Function: Function = globalThis.Function, Object: Object = globalThis.Object } = opts;
    const oldDefineProperty = Object.defineProperty.bind(Object);
    const _proxyData = new _WeakMap();
    function protoChained(f, { Reflect: Reflect = _Reflect } = {}) {
        return (0, $abDdz$protoChained)(f, {
            Reflect: Reflect
        });
    }
    let ospo;
    const _Reflect = {
        apply: Function.prototype.apply.call.bind(Function.prototype.apply),
        construct: (target, args, self)=>_proxyData.has(target) && "construct" in _proxyData.get(target).handler ? _proxyData.get(target).handler.construct(_proxyData.get(target).object, args, self) : target === self ? new target(...args) : _Reflect.apply(target, self, args),
        get: protoChained((object, key)=>_proxyData.has(object) && "get" in _proxyData.get(object).handler && !(0, $abDdz$isPolyfillKey)(key) ? _proxyData.get(object).handler.get(_proxyData.get(object).object, key, object) : (0, $abDdz$descGet)(object, key)),
        set: protoChained((object, key, value)=>_proxyData.has(object) && "set" in _proxyData.get(object).handler && !(0, $abDdz$isPolyfillKey)(key) ? _proxyData.get(object).handler.set(_proxyData.get(object).object, key, value, object) : ((0, $abDdz$descSet)(object, key, value), true)),
        has: protoChained((object, key)=>_proxyData.has(object) && "has" in _proxyData.get(object).handler && !(0, $abDdz$isPolyfillKey)(key) ? _proxyData.get(object).handler.has(_proxyData.get(object).object, key) : (0, $abDdz$desc)(object, key) !== null),
        setPrototypeOf: ospo = ((old, object, proto)=>(old(object, proto), true)).bind(null, "setPrototypeOf" in Object ? Object.setPrototypeOf.bind(Object) : (object, proto)=>(object.__proto__ = proto, object))
    };
    function reflectProp(obj, key) {
        return {
            get: ()=>_Reflect.get(obj, key, obj),
            set: (v)=>_Reflect.set(obj, key, v, obj),
            enumerable: false,
            configurable: false
        };
    }
    const _Proxy = class ProxyTemp extends Function {
        static __call = Function.prototype.call.call.bind(Function.prototype.call);
        constructor(object, handler){
            const m = ProxyTemp.__create(object, handler);
            ospo(m, ProxyTemp.prototype);
            return m;
        }
        static __link(proxy) {
            const { object: object } = _proxyData.get(proxy);
            for(const prop in object)try {
                oldDefineProperty(object, prop, reflectProp(object, prop));
            } catch  {}
        }
        static __create(object, handler) {
            const fn = function(...args) {
                if (this instanceof fn) {
                    if ("construct" in handler) return handler.construct(object, args, new.target);
                    return new object(...args);
                } else {
                    if ("apply" in handler) return handler.apply(object, this, args);
                    return ProxyTemp.__call(object, this, ...args);
                }
            };
            _proxyData.set(fn, {
                object: object,
                handler: handler
            });
            ProxyTemp.__link(fn);
            return fn;
        }
        static{
            for (const trap of [
                "defineProperty",
                "getOwnPropertyDescriptor",
                "getOwnPropertyDescriptors",
                "freeze",
                "seal",
                "preventExtensions",
                "getPrototypeOf",
                "setPrototypeOf"
            ])if (trap in Object) {
                _Reflect[trap] = new ProxyTemp(trap in _Reflect ? _Reflect[trap] : Object[trap].bind(Object), {
                    apply (target, self, args) {
                        if (_proxyData.has(args[0])) {
                            if (trap in _proxyData.get(args[0])?.handler) return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
                            else {
                                args[0] = _proxyData.get(args[0]).object;
                                return _Reflect.apply(target, self, args);
                            }
                        } else return _Reflect.apply(target, self, args);
                    }
                });
                Object[trap] = new ProxyTemp(Object[trap], {
                    apply (target, self, args) {
                        if (_proxyData.has(args[0])) {
                            if (trap in _proxyData.get(args[0])?.handler) return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
                            else {
                                args[0] = _proxyData.get(args[0]).object;
                                return _Reflect.apply(target, self, args);
                            }
                        } else return _Reflect.apply(target, self, args);
                    }
                });
            }
            Function.prototype.toString = new ProxyTemp(Function.prototype.toString, {
                apply (target, thisArg, argArray) {
                    while(_proxyData.has(thisArg))thisArg = _proxyData.get(thisArg).object;
                    return _Reflect.apply(target, thisArg, argArray);
                }
            });
        }
    };
    return {
        Proxy: _Proxy,
        Reflect: _Reflect,
        WeakMap: _WeakMap
    };
}


export {$aaee49ddaa217a0d$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
