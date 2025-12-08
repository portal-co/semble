"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports._Reflect = exports._Proxy = void 0;
const semble_weak_map_1 = require("@portal-solutions/semble-weak-map");
const semble_proxy_factory_1 = __importDefault(require("@portal-solutions/semble-proxy.factory"));
// import { polyfillKeys } from "@portal-solutions/semble-common";
_a = "Proxy" in globalThis && "Reflect" in globalThis
    ? globalThis
    : (0, semble_proxy_factory_1.default)({ WeakMap: semble_weak_map_1._WeakMap }), exports._Proxy = _a.Proxy, exports._Reflect = _a.Reflect;
