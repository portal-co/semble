import { polyfillKeys, defineProperty } from "@portal-solutions/semble-common";

export let _WeakMap: typeof WeakMap =
  "WeakMap" in globalThis
    ? globalThis.WeakMap
    : (class WeakMapTemp {
        static __symbol =
          "Symbol" in globalThis
            ? globalThis.Symbol(`__SembleWeakMap`)
            : `__SembleWeakMap`;
        static __create =
          "create" in Object ? Object.create.bind(Object, null) : () => ({});
        static {
          let symbol = this.__symbol;
          polyfillKeys[symbol] = true;
          let create = this.__create;
          for (var a of ["seal", "freeze"]) {
            if (!(a in Object)) {
              continue;
            }
            Object[a] =
              "Proxy" in globalThis
                ? new globalThis.Proxy(Object[a], {
                    apply(target, thisArg, argArray) {
                      WeakMapTemp.__get(argArray[0]);
                      return Reflect.apply(target, thisArg, argArray);
                    },
                  })
                : ((old, b, ...args) => {
                    WeakMapTemp.__get(b);
                    return old(b, ...args);
                  }).bind(null, Object[a].bind(Object));
          }
        }
        static __get(a: any): { [a: string]: any } {
          if (defineProperty && !(this.__symbol in a)) {
            const created = WeakMapTemp.__create();
            defineProperty(a, this.__symbol, {
              value: created,
              enumerable: false,
              configurable: false,
              writable: true,
            });
            return created;
          }
          return (a[this.__symbol] ??= WeakMapTemp.__create());
        }
        id: string;
        constructor() {
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
      } as any);
