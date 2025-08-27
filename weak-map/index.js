import {polyfillKeys as $3YwHo$polyfillKeys} from "@portal-solutions/semble-common";


const $812c501c172fea14$var$defineProperty = Object?.defineProperty;
const $812c501c172fea14$var$getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor;
const $812c501c172fea14$var$symId = '__SembleWeakMap';
let $812c501c172fea14$export$bc81b4c74ea2198d = 'WeakMap' in globalThis ? globalThis.WeakMap : class WeakMapTemp {
    static{
        this.__symbol = 'Symbol' in globalThis ? globalThis.Symbol($812c501c172fea14$var$symId) : $812c501c172fea14$var$symId;
    }
    static{
        this.__create = 'create' in Object ? Object.create.bind(Object, null) : ()=>({});
    }
    static{
        let symbol = this.__symbol;
        (0, $3YwHo$polyfillKeys)[symbol] = true;
        let create = this.__create;
        for (var objectProperty of [
            'seal',
            'freeze',
            'preventExtensions'
        ]){
            if (!(objectProperty in Object)) continue;
            Object[objectProperty] = 'Proxy' in globalThis ? ((apply)=>new globalThis.Proxy(Object[objectProperty], {
                    apply (target, thisArg, argArray) {
                        WeakMapTemp.__get(argArray[0]);
                        return apply(target, thisArg, argArray);
                    }
                }))(Reflect.apply.bind(Reflect)) : ((old, b, ...args)=>{
                WeakMapTemp.__get(b);
                return old(b, ...args);
            }).bind(null, Object[objectProperty].bind(Object));
        }
    }
    static __get(target) {
        if ($812c501c172fea14$var$getOwnPropertyDescriptor && $812c501c172fea14$var$defineProperty) {
            const desc = $812c501c172fea14$var$getOwnPropertyDescriptor(target, this.__symbol);
            if (desc) return desc.value;
            const value = WeakMapTemp.__create();
            $812c501c172fea14$var$defineProperty(target, this.__symbol, {
                value: value,
                enumerable: false,
                writable: true,
                configurable: false
            });
            return value;
        }
        if ($812c501c172fea14$var$defineProperty && !(this.__symbol in target)) $812c501c172fea14$var$defineProperty(target, this.__symbol, {
            value: WeakMapTemp.__create(),
            enumerable: false,
            writable: true,
            configurable: false
        });
        return target[this.__symbol] ??= WeakMapTemp.__create();
    }
    constructor(){
        this.id = Math.random() + "";
    }
    delete(object) {
        delete WeakMapTemp.__get(object)[this.id];
    }
    has(object) {
        return this.id in WeakMapTemp.__get(object);
    }
    get(object) {
        return WeakMapTemp.__get(object)[this.id];
    }
    set(object, value) {
        WeakMapTemp.__get(object)[this.id] = value;
    }
};


export {$812c501c172fea14$export$bc81b4c74ea2198d as _WeakMap};
//# sourceMappingURL=index.js.map
