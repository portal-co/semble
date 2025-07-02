let $812c501c172fea14$export$bc81b4c74ea2198d = 'WeakMap' in globalThis ? globalThis.WeakMap : class WeakMapTemp {
    static{
        this.symbol = 'Symbol' in globalThis ? globalThis.Symbol(`__SembleWeakMap`) : `__SembleWeakMap`;
    }
    static{
        let symbol = this.symbol;
        for (var a of [
            'seal',
            'freeze'
        ]){
            if (!(a in Object)) continue;
            Object[a] = 'Proxy' in globalThis ? new globalThis.Proxy(Object[a], {
                apply (target, thisArg, argArray) {
                    argArray[0][symbol] ??= {};
                    return Reflect.apply(target, thisArg, argArray);
                }
            }) : ((old, b, ...args)=>{
                b[this.symbol] ??= {};
                return old(b, ...args);
            }).bind(null, Object[a].bind(Object));
        }
    }
    static __get(a) {
        return a[this.symbol] ??= {};
    }
    constructor(){
        this.id = Math.random() + "";
    }
    delete(o) {
        delete WeakMapTemp.__get(o)[this.id];
    }
    has(o) {
        return this.id in WeakMapTemp.__get(o);
    }
    get(o) {
        return WeakMapTemp.__get(o)[this.id];
    }
    set(o, v) {
        WeakMapTemp.__get(o)[this.id] = v;
    }
};


export {$812c501c172fea14$export$bc81b4c74ea2198d as _WeakMap};
//# sourceMappingURL=index.js.map
