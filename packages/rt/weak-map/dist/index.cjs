"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._WeakMap = void 0;
const semble_weak_map_factory_1 = __importDefault(require("@portal-solutions/semble-weak-map.factory"));
const defineProperty = Object?.defineProperty;
const getOwnPropertyDescriptor = Object?.getOwnPropertyDescriptor;
const symId = "__SembleWeakMap";
exports._WeakMap = "WeakMap" in globalThis
    ? globalThis.WeakMap
    : (0, semble_weak_map_factory_1.default)({
        symId,
        defineProperty,
        getOwnPropertyDescriptor,
        Proxy: globalThis?.Proxy,
        Object,
        Reflect: globalThis?.Reflect,
        Symbol: globalThis?.Symbol,
    });
