# semble

A TypeScript polyfill library for `WeakMap`, `Proxy`/`Reflect`, `ArrayBuffer`, and `DataView`. The goal is to make these APIs available in JavaScript environments that lack native support, targeting environments as old as ES3/ES5.

The Cargo.toml description calls it "the impossible polyfill", referring to the inherent difficulty of emulating these semantics without native engine support.

## What it actually is

Six TypeScript packages under `packages/rt/`, each compiled to JS using [zshy](https://github.com/colinhacks/zshy). The packages form a dependency chain: `WeakMap` is implemented first and used as a building block for `Proxy`/`Reflect`, which is in turn used to implement `ArrayBuffer`/`DataView`.

There is also a `Cargo.toml` at the root that declares a Rust workspace with SWC dependencies (`swc_ecma_parser`, `swc_bundler`, etc.) and a reference to `portal-solutions-swibb`. The workspace currently has no members (`members=[]`), meaning no Rust crates exist in the repo yet. The SWC dependencies suggest a planned Rust-side tooling component (likely a bundler or transform step), but it is not implemented.

## Packages

All packages are under `packages/rt/` and are published under the `@portal-solutions/` npm scope.

### `semble-common` (`packages/rt/common/`)

Shared utilities and infrastructure used by all other packages. Handles two distinct runtime tiers:

- **ES5+**: Uses `Object.defineProperty` and `Object.getOwnPropertyDescriptor` normally.
- **ES3 fallback**: When those APIs are absent, switches to a string-prefix scheme (`__SemblePropertyFor__<key>`) to store property descriptors in plain object slots.

Exports:
- `polyfillKeys` — a registry object used to mark property keys that belong to the polyfill internals, so that polyfilled `Proxy` traps can skip them.
- `isPolyfillKey` — checks whether a key is a polyfill-internal key.
- `hide` — makes a property non-enumerable (no-op in ES3).
- `protoChained` — walks the prototype chain to find an own property descriptor before applying a function; used internally by `Proxy`.
- `desc`, `descGet`, `descSet`, `defineProperty`, `getOwnPropertyDescriptor` — abstracted property descriptor access that works under both ES5 and ES3 modes.

### `semble-weak-map.factory` (`packages/rt/weak-map/factory/`)

A factory function that constructs a `WeakMap` class. The implementation stores per-map entries as non-enumerable properties directly on the key objects, using a unique Symbol (or string fallback) as the property name. Each `WeakMap` instance gets a random numeric id, and entries are stored under `target[symbol][id]`.

When `Object.freeze`, `Object.seal`, or `Object.preventExtensions` are used, the factory pre-copies the map's storage slot onto the object before it becomes non-extensible (using `Proxy` or a plain wrapper if `Proxy` is available).

The factory is parameterized so that callers can inject `Symbol`, `Proxy`, `Reflect`, `defineProperty`, `getOwnPropertyDescriptor`, and `Object` — allowing it to work in constrained environments.

### `semble-weak-map` (`packages/rt/weak-map/`)

Uses `semble-weak-map.factory` to produce `_WeakMap`. Exports the native `globalThis.WeakMap` unchanged if it exists, otherwise returns the polyfilled version.

### `semble-proxy.factory` (`packages/rt/proxy/factory/`)

A factory function that constructs both a `Proxy` class and a `Reflect` object, given an injected `WeakMap` implementation.

The polyfilled `Proxy` works by:
1. Creating a real function (so `instanceof Function` holds and `call`/`apply` work).
2. Storing `{ object, handler }` in a `WeakMap` keyed by the proxy function.
3. Overriding `Object` methods (`defineProperty`, `getOwnPropertyDescriptor`, `freeze`, `seal`, `preventExtensions`, `getPrototypeOf`, `setPrototypeOf`) and `Function.prototype.toString` to intercept operations on proxied objects and route them through the handler's traps.

The polyfilled `Reflect` implements `apply`, `construct`, `get`, `set`, `has`, `setPrototypeOf`, and all `Object`-mirrored traps. Polyfill-internal keys are explicitly excluded from `get`/`set`/`has` traps to prevent infinite recursion.

### `semble-proxy` (`packages/rt/proxy/`)

Exports `_Proxy` and `_Reflect`. Uses native `globalThis.Proxy` and `globalThis.Reflect` if both are present, otherwise calls the factory with `_WeakMap`.

### `semble-dataview` (`packages/rt/dataview/`)

Polyfills `ArrayBuffer` and `DataView`.

- `_ArrayBuffer`: Returns native `globalThis.ArrayBuffer` if available. Otherwise implements a pure-JS `ArrayBuffer` backed by a plain number array, with string-based serialization/deserialization (`toByteString`). Uses `_WeakMap` to store the backing byte array.
- `_DataView`: Returns native `globalThis.DataView` if available. Otherwise implements a full `DataView` with `getInt8`/`setInt8`, `getUint8`/`setUint8`, `getInt16`/`setInt16`, `getUint16`/`setUint16`, `getInt32`/`setInt32`, `getUint32`/`setUint32`, `getFloat32`/`setFloat32`, `getFloat64`/`setFloat64`. Float read/write code is derived from a Joyent/Node.js implementation.
- `_DataView_prototype`: A pre-bound version of all `DataView.prototype` methods (as `method.call.bind(method)`).

## Build system

Each package is built by running `npx zshy -p <tsconfig>` from its directory. `zshy` is a TypeScript-to-JS build tool that handles dual ESM/CJS output. The root `build.sh` runs all six package build scripts in dependency order. `publish.sh` runs `build.sh` then `npm publish --access public --workspaces`.

The compiled `.js`, `.d.ts`, and source map files are checked into the repository alongside the `.ts` source.

## Current state

- The six TypeScript runtime packages are complete and built.
- No tests exist in the repository.
- The Rust workspace (`Cargo.toml`) has no crates implemented yet; it declares SWC and `swibb` dependencies but `members=[]`.
- No package.json files exist for individual packages in the working tree (they may be generated by zshy or were not committed).
- The repo has a single commit on `main` (cloned from `https://github.com/portal-co/semble.git`).

## Known limitations of the polyfill approach

- The `Proxy` polyfill only intercepts operations that go through the overridden `Object` methods. Direct property access via `obj.key` syntax still bypasses the handler for properties not pre-copied to the proxy function at creation time.
- `WeakMap` keys are not actually weakly held — entries remain on the key object until explicitly deleted, so there is no garbage collection benefit.
- The `Proxy` implementation requires that proxied targets be callable (functions), since the polyfill proxy is itself a function.
