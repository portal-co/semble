export const polyfillKeys = {};
export const isPolyfillKey = a => (typeof a === "string" || typeof a === "symbol") && a in polyfillKeys;