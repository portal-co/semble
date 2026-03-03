import { polyfillKeys } from "@portal-solutions/semble-common";
import factory from "@portal-solutions/semble-weak-map.factory";
const defineProperty = Object?.defineProperty;
const getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor;
const symId = "__SembleWeakMap";
export let _WeakMap: typeof WeakMap =
  "WeakMap" in globalThis
    ? globalThis.WeakMap
    : factory({
        symId,
        defineProperty,
        getOwnPropertyDescriptor,
        Proxy: globalThis?.Proxy,
        Object,
        Reflect: globalThis?.Reflect,
        Symbol: globalThis?.Symbol,
      });
