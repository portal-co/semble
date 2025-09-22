import {_WeakMap as $jgfBo$_WeakMap} from "@portal-solutions/semble-weak-map";
import {protoChained as $jgfBo$protoChained, isPolyfillKey as $jgfBo$isPolyfillKey, descGet as $jgfBo$descGet, descSet as $jgfBo$descSet, desc as $jgfBo$desc} from "@portal-solutions/semble-common";



const $b5032d99bc4c7ee9$var$_proxyData = new (0, $jgfBo$_WeakMap)();
function $b5032d99bc4c7ee9$var$protoChained(f, { Reflect: Reflect = $b5032d99bc4c7ee9$export$c7c8cae26635c874 } = {}) {
    return (0, $jgfBo$protoChained)(f, {
        Reflect: Reflect
    });
}
const $b5032d99bc4c7ee9$export$c7c8cae26635c874 = "Reflect" in globalThis ? globalThis.Reflect : {
    apply: Function.prototype.apply.call.bind(Function.prototype.apply),
    construct: (target, args, self)=>$b5032d99bc4c7ee9$var$_proxyData.has(target) && "construct" in $b5032d99bc4c7ee9$var$_proxyData.get(target).handler ? $b5032d99bc4c7ee9$var$_proxyData.get(target).handler.construct($b5032d99bc4c7ee9$var$_proxyData.get(target).object, args, self) : target === self ? new target(...args) : $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, self, args),
    get: $b5032d99bc4c7ee9$var$protoChained((object, key)=>$b5032d99bc4c7ee9$var$_proxyData.has(object) && "get" in $b5032d99bc4c7ee9$var$_proxyData.get(object).handler && !(0, $jgfBo$isPolyfillKey)(key) ? $b5032d99bc4c7ee9$var$_proxyData.get(object).handler.get($b5032d99bc4c7ee9$var$_proxyData.get(object).object, key, object) : (0, $jgfBo$descGet)(object, key)),
    set: $b5032d99bc4c7ee9$var$protoChained((object, key, value)=>$b5032d99bc4c7ee9$var$_proxyData.has(object) && "set" in $b5032d99bc4c7ee9$var$_proxyData.get(object).handler && !(0, $jgfBo$isPolyfillKey)(key) ? $b5032d99bc4c7ee9$var$_proxyData.get(object).handler.set($b5032d99bc4c7ee9$var$_proxyData.get(object).object, key, value, object) : ((0, $jgfBo$descSet)(object, key, value), true)),
    has: $b5032d99bc4c7ee9$var$protoChained((object, key)=>$b5032d99bc4c7ee9$var$_proxyData.has(object) && "has" in $b5032d99bc4c7ee9$var$_proxyData.get(object).handler && !(0, $jgfBo$isPolyfillKey)(key) ? $b5032d99bc4c7ee9$var$_proxyData.get(object).handler.has($b5032d99bc4c7ee9$var$_proxyData.get(object).object, key) : (0, $jgfBo$desc)(object, key) !== null),
    setPrototypeOf: ((old, object, proto)=>(old(object, proto), true)).bind(null, "setPrototypeOf" in Object ? Object.setPrototypeOf.bind(Object) : (object, proto)=>(object.__proto__ = proto, object))
};
const $b5032d99bc4c7ee9$export$38ba3e7950588cca = "Proxy" in globalThis ? globalThis.Proxy : class ProxyTemp extends Function {
    static __call = Function.prototype.call.call.bind(Function.prototype.call);
    constructor(object, handler){
        const m = ProxyTemp.__create(object, handler);
        $b5032d99bc4c7ee9$export$c7c8cae26635c874.setPrototypeOf(m, ProxyTemp.prototype);
        return m;
    }
    static __create(object, handler) {
        const fn = function(...args) {
            if (this instanceof fn) {
                if ("construct" in handler) return handler.construct(object, args, this);
                return new object(...args);
            } else {
                if ("apply" in handler) return handler.apply(object, this, args);
                return ProxyTemp.__call(object, this, ...args);
            }
        };
        $b5032d99bc4c7ee9$var$_proxyData.set(fn, {
            object: object,
            handler: handler
        });
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
            $b5032d99bc4c7ee9$export$c7c8cae26635c874[trap] = new ProxyTemp(trap in $b5032d99bc4c7ee9$export$c7c8cae26635c874 ? $b5032d99bc4c7ee9$export$c7c8cae26635c874[trap] : Object[trap].bind(Object), {
                apply (target, self, args) {
                    if ($b5032d99bc4c7ee9$var$_proxyData.has(args[0])) {
                        if (trap in $b5032d99bc4c7ee9$var$_proxyData.get(args[0])?.handler) return $b5032d99bc4c7ee9$var$_proxyData.get(args[0])?.handler?.[trap]?.(...args);
                        else {
                            args[0] = $b5032d99bc4c7ee9$var$_proxyData.get(args[0]).object;
                            return $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, self, args);
                        }
                    } else return $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, self, args);
                }
            });
            Object[trap] = new ProxyTemp(Object[trap], {
                apply (target, self, args) {
                    if ($b5032d99bc4c7ee9$var$_proxyData.has(args[0])) {
                        if (trap in $b5032d99bc4c7ee9$var$_proxyData.get(args[0])?.handler) return $b5032d99bc4c7ee9$var$_proxyData.get(args[0])?.handler?.[trap]?.(...args);
                        else {
                            args[0] = $b5032d99bc4c7ee9$var$_proxyData.get(args[0]).object;
                            return $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, self, args);
                        }
                    } else return $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, self, args);
                }
            });
        }
        Function.prototype.toString = new ProxyTemp(Function.prototype.toString, {
            apply (target, thisArg, argArray) {
                while($b5032d99bc4c7ee9$var$_proxyData.has(thisArg))thisArg = $b5032d99bc4c7ee9$var$_proxyData.get(thisArg).object;
                return $b5032d99bc4c7ee9$export$c7c8cae26635c874.apply(target, thisArg, argArray);
            }
        });
    }
};


export {$b5032d99bc4c7ee9$export$c7c8cae26635c874 as _Reflect, $b5032d99bc4c7ee9$export$38ba3e7950588cca as _Proxy};
//# sourceMappingURL=index.js.map
