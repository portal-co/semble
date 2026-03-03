"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
// import { polyfillKeys } from "@portal-solutions/semble-common";
const semble_common_1 = require("@portal-solutions/semble-common");
const semble_common_2 = require("@portal-solutions/semble-common");
function create(opts = {}) {
    const _WeakMap = opts.WeakMap ?? globalThis.WeakMap;
    const { Function = globalThis.Function, Object = globalThis.Object } = opts;
    const oldDefineProperty = Object.defineProperty.bind(Object);
    const _proxyData = new _WeakMap();
    function protoChained(f, { Reflect = _Reflect, } = {}) {
        return (0, semble_common_1.protoChained)(f, { Reflect });
    }
    let ospo;
    const _Reflect = {
        apply: Function.prototype.apply.call.bind(Function.prototype.apply),
        construct: (target, args, self) => _proxyData.has(target) && "construct" in _proxyData.get(target).handler
            ? _proxyData.get(target).handler.construct(_proxyData.get(target).object, args, self)
            : target === self
                ? new target(...args)
                : _Reflect.apply(target, self, args),
        get: protoChained((object, key) => _proxyData.has(object) &&
            "get" in _proxyData.get(object).handler &&
            !(0, semble_common_1.isPolyfillKey)(key)
            ? _proxyData.get(object).handler.get(_proxyData.get(object).object, key, object)
            : (0, semble_common_2.descGet)(object, key)),
        set: protoChained((object, key, value) => _proxyData.has(object) &&
            "set" in _proxyData.get(object).handler &&
            !(0, semble_common_1.isPolyfillKey)(key)
            ? _proxyData.get(object).handler.set(_proxyData.get(object).object, key, value, object)
            : ((0, semble_common_2.descSet)(object, key, value), true)),
        has: protoChained((object, key) => _proxyData.has(object) &&
            "has" in _proxyData.get(object).handler &&
            !(0, semble_common_1.isPolyfillKey)(key)
            ? _proxyData.get(object).handler.has(_proxyData.get(object).object, key)
            : (0, semble_common_2.desc)(object, key) !== null),
        setPrototypeOf: (ospo = ((old, object, proto) => (old(object, proto), true)).bind(null, "setPrototypeOf" in Object
            ? Object.setPrototypeOf.bind(Object)
            : (object, proto) => ((object.__proto__ = proto), object))),
    };
    function reflectProp(obj, key) {
        return {
            get: () => _Reflect.get(obj, key, obj),
            set: (v) => _Reflect.set(obj, key, v, obj),
            enumerable: false,
            configurable: false,
        };
    }
    const _Proxy = class ProxyTemp extends Function {
        static __call = Function.prototype.call.call.bind(Function.prototype.call);
        constructor(object, handler) {
            if (false)
                super(); //Obey TS
            const m = ProxyTemp.__create(object, handler);
            ospo(m, ProxyTemp.prototype);
            return m;
        }
        static __link(proxy) {
            const { object } = _proxyData.get(proxy);
            for (const prop in object)
                try {
                    oldDefineProperty(object, prop, reflectProp(object, prop));
                }
                catch { }
        }
        static __create(object, handler) {
            const fn = function (...args) {
                if (this instanceof fn) {
                    if ("construct" in handler) {
                        return handler.construct(object, args, new.target);
                    }
                    return new object(...args);
                }
                else {
                    if ("apply" in handler) {
                        return handler.apply(object, this, args);
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
                    _Reflect[trap] = new ProxyTemp(trap in _Reflect ? _Reflect[trap] : Object[trap].bind(Object), {
                        apply(target, self, args) {
                            if (_proxyData.has(args[0])) {
                                if (trap in _proxyData.get(args[0])?.handler) {
                                    return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
                                }
                                else {
                                    args[0] = _proxyData.get(args[0]).object;
                                    return _Reflect.apply(target, self, args);
                                }
                            }
                            else {
                                return _Reflect.apply(target, self, args);
                            }
                        },
                    });
                    Object[trap] = new ProxyTemp(Object[trap], {
                        apply(target, self, args) {
                            if (_proxyData.has(args[0])) {
                                if (trap in _proxyData.get(args[0])?.handler) {
                                    return _proxyData.get(args[0])?.handler?.[trap]?.(...args);
                                }
                                else {
                                    args[0] = _proxyData.get(args[0]).object;
                                    return _Reflect.apply(target, self, args);
                                }
                            }
                            else {
                                return _Reflect.apply(target, self, args);
                            }
                        },
                    });
                }
            }
            Function.prototype.toString = new ProxyTemp(Function.prototype.toString, {
                apply(target, thisArg, argArray) {
                    while (_proxyData.has(thisArg))
                        thisArg = _proxyData.get(thisArg).object;
                    return _Reflect.apply(target, thisArg, argArray);
                },
            });
        }
    };
    return { Proxy: _Proxy, Reflect: _Reflect, WeakMap: _WeakMap };
}
module.exports = exports.default;
