import { describe, it, expect } from 'vitest'
import { _Proxy, _Reflect } from '../proxy/index.ts'
import { _WeakMap } from '../weak-map/index.ts'
import { _ArrayBuffer, _DataView } from '../dataview/index.ts'

describe('Integration tests', () => {
  describe('Proxy with WeakMap', () => {
    it('should use WeakMap internally for proxy state', () => {
      const wm = new _WeakMap()
      const obj = {}
      const value = { test: 'data' }
      
      wm.set(obj, value)
      
      const proxy = new _Proxy(obj, {
        get: (target, prop) => {
          if (prop === 'stored') return wm.get(target)
          return _Reflect.get(target, prop)
        }
      })
      
      expect(proxy.stored).toBe(value)
    })
  })

  describe('DataView with ArrayBuffer', () => {
    it('should read and write multi-byte values correctly', () => {
      const buffer = new _ArrayBuffer(24)
      const view = new _DataView(buffer)
      
      view.setUint8(0, 0xFF)
      view.setUint16(2, 0x1234, true)
      view.setUint32(4, 0xDEADBEEF, true)
      view.setFloat32(8, 3.14, true)
      view.setFloat64(12, 2.718281828, false)
      
      expect(view.getUint8(0)).toBe(0xFF)
      expect(view.getUint16(2, true)).toBe(0x1234)
      expect(view.getUint32(4, true)).toBe(0xDEADBEEF)
      expect(Math.abs(view.getFloat32(8, true) - 3.14)).toBeLessThan(0.01)
    })

    it('should handle buffer slicing', () => {
      const buffer = new _ArrayBuffer(8)
      const view1 = new _DataView(buffer)
      
      view1.setUint32(0, 0x12345678, true)
      view1.setUint32(4, 0xABCDEF00, true)
      
      const sliced = buffer.slice(2, 6)
      const view2 = new _DataView(sliced)
      
      expect(sliced.byteLength).toBe(4)
      expect(view2.byteLength).toBe(4)
    })
  })

  describe('Proxy with ArrayBuffer', () => {
    it('should proxy ArrayBuffer access', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      view.setUint32(0, 42, true)
      
      const proxy = new _Proxy(buffer, {
        get: (target, prop) => {
          if (prop === 'length') return target.byteLength
          return _Reflect.get(target, prop)
        }
      })
      
      expect(proxy.length).toBe(8)
      expect(proxy.byteLength).toBe(8)
    })
  })

  describe('Complete polyfill stack', () => {
    it('should work with complex nested structures', () => {
      const buffer = new _ArrayBuffer(16)
      const view = new _DataView(buffer)
      const wm = new _WeakMap()
      
      const metadata = { version: 1, author: 'test' }
      wm.set(buffer, metadata)
      
      const proxy = new _Proxy(buffer, {
        get: (target, prop) => {
          if (prop === 'metadata') return wm.get(target)
          return _Reflect.get(target, prop)
        }
      })
      
      view.setUint32(0, 12345, true)
      
      expect(proxy.metadata).toBe(metadata)
      expect(proxy.byteLength).toBe(16)
      expect(view.getUint32(0, true)).toBe(12345)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty ArrayBuffer', () => {
      const buffer = new _ArrayBuffer(0)
      expect(buffer.byteLength).toBe(0)
    })

    it('should handle proxy of proxy', () => {
      const target = { value: 1 }
      const proxy1 = new _Proxy(target, {
        get: (t, p) => _Reflect.get(t, p) * 2
      })
      const proxy2 = new _Proxy(proxy1, {
        get: (t, p) => _Reflect.get(t, p) + 10
      })
      
      expect(proxy2.value).toBe(12)
    })

    it('should handle WeakMap with different key types', () => {
      const wm = new _WeakMap()
      const objKey = {}
      const arrKey = []
      const funcKey = () => {}
      
      wm.set(objKey, 'obj')
      wm.set(arrKey, 'arr')
      wm.set(funcKey, 'func')
      
      expect(wm.get(objKey)).toBe('obj')
      expect(wm.get(arrKey)).toBe('arr')
      expect(wm.get(funcKey)).toBe('func')
    })
  })
})
