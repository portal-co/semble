import { _WeakMap } from "@portal-solutions/semble-weak-map";
import create from "@portal-solutions/semble-proxy.factory";
// import { polyfillKeys } from "@portal-solutions/semble-common";
export const { Proxy: _Proxy, Reflect: _Reflect } =
  "Proxy" in globalThis && "Reflect" in globalThis
    ? globalThis
    : create({ WeakMap: _WeakMap });
