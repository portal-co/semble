import { polyfillKeys as _polyfillKeys } from "@portal-solutions/semble-common";
type _Reflect = typeof Reflect;
export default function create({
  polyfillKeys = _polyfillKeys,
  symId = '__sembleWeakMap__',
  defineProperty = undefined,
  getOwnPropertyDescriptor = undefined,
  Reflect = undefined,
  ...globalThis
}: { polyfillKeys?: typeof _polyfillKeys,symId?: string,Symbol?: undefined | typeof Symbol,Proxy?: undefined | typeof Proxy,Reflect?: undefined | _Reflect, defineProperty?: undefined | typeof Object.defineProperty, getOwnPropertyDescriptor?: undefined | typeof Object.getOwnPropertyDescriptor } = {}): typeof WeakMap {
  return class WeakMapTemp {
    static __symbol = "Symbol" in globalThis && globalThis['Symbol'] !== undefined ? globalThis.Symbol(symId) : symId;
    static __create =
      "create" in Object ? Object.create.bind(Object, null) : () => ({});
    static {
      let symbol = this.__symbol;
      polyfillKeys[symbol] = true;
      let create = this.__create;
      for (var objectProperty of ["seal", "freeze", "preventExtensions"]) {
        if (!(objectProperty in Object)) {
          continue;
        }
        Object[objectProperty] =
          "Proxy" in globalThis && globalThis['Proxy'] !== undefined && Reflect !== undefined
            ? ((apply) =>
                new globalThis.Proxy(Object[objectProperty], {
                  apply(target, thisArg, argArray) {
                    WeakMapTemp.__get(argArray[0]);
                    return apply(target, thisArg, argArray);
                  },
                }))(Reflect.apply.bind(Reflect))
            : ((old, b, ...args) => {
                WeakMapTemp.__get(b);
                return old(b, ...args);
              }).bind(null, Object[objectProperty].bind(Object));
      }
    }
    static __get(target: any): { [a: string]: any } {
      if (getOwnPropertyDescriptor && defineProperty) {
        const desc = getOwnPropertyDescriptor(target, this.__symbol);
        if (desc) return desc.value;
        const value = WeakMapTemp.__create();
        defineProperty(target, this.__symbol, {
          value,
          enumerable: false,
          writable: true,
          configurable: false,
        });
        return value;
      }
      if (defineProperty && !(this.__symbol in target))
        defineProperty(target, this.__symbol, {
          value: WeakMapTemp.__create(),
          enumerable: false,
          writable: true,
          configurable: false,
        });
      return (target[this.__symbol] ??= WeakMapTemp.__create());
    }
    id: string;
    constructor() {
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
  } as any;
}
