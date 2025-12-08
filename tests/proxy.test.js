import { describe, it, expect } from 'vitest'
import { _Proxy, _Reflect } from '../proxy/index.ts'

describe('Proxy and Reflect polyfills', () => {
  describe('Proxy', () => {
    it('should create a proxy', () => {
      const target = { a: 1 }
      const proxy = new _Proxy(target, {})
      expect(proxy).toBeDefined()
    })

    it('should intercept get operations', () => {
      const target = { a: 1 }
      const handler = {
        get: (target, prop) => {
          return prop in target ? target[prop] * 2 : undefined
        }
      }
      const proxy = new _Proxy(target, handler)
      expect(proxy.a).toBe(2)
    })

    it('should intercept set operations', () => {
      const target = { a: 1 }
      let setCalled = false
      const handler = {
        set: (target, prop, value) => {
          setCalled = true
          target[prop] = value * 2
          return true
        }
      }
      const proxy = new _Proxy(target, handler)
      proxy.a = 5
      expect(setCalled).toBe(true)
      expect(target.a).toBe(10)
    })

    it('should intercept has operations', () => {
      const target = { a: 1 }
      const handler = {
        has: (target, prop) => {
          return prop === 'b' || prop in target
        }
      }
      const proxy = new _Proxy(target, handler)
      expect('a' in proxy).toBe(true)
      expect('b' in proxy).toBe(true)
      expect('c' in proxy).toBe(false)
    })

    it('should proxy function calls', () => {
      const target = function(x) { return x * 2 }
      const handler = {
        apply: (target, thisArg, args) => {
          return target(...args) + 10
        }
      }
      const proxy = new _Proxy(target, handler)
      expect(proxy(5)).toBe(20)
    })

    it('should proxy constructor calls', () => {
      class Target {
        constructor(value) {
          this.value = value
        }
      }
      const handler = {
        construct: (target, args) => {
          const obj = new target(...args)
          obj.value = obj.value * 2
          return obj
        }
      }
      const proxy = new _Proxy(Target, handler)
      const instance = new proxy(5)
      expect(instance.value).toBe(10)
    })
  })

  describe('Reflect', () => {
    it('should get property values', () => {
      const obj = { a: 1, b: 2 }
      expect(_Reflect.get(obj, 'a')).toBe(1)
    })

    it('should set property values', () => {
      const obj = { a: 1 }
      _Reflect.set(obj, 'b', 2)
      expect(obj.b).toBe(2)
    })

    it('should check property existence', () => {
      const obj = { a: 1 }
      expect(_Reflect.has(obj, 'a')).toBe(true)
      expect(_Reflect.has(obj, 'b')).toBe(false)
    })

    it('should apply function', () => {
      function sum(a, b) {
        return a + b
      }
      expect(_Reflect.apply(sum, null, [1, 2])).toBe(3)
    })

    it('should construct instances', () => {
      class Test {
        constructor(value) {
          this.value = value
        }
      }
      const instance = _Reflect.construct(Test, [42])
      expect(instance.value).toBe(42)
      expect(instance instanceof Test).toBe(true)
    })
  })

  describe('Proxy and Reflect integration', () => {
    it('should work together for property access', () => {
      const target = { a: 1 }
      const handler = {
        get: (target, prop, receiver) => {
          return _Reflect.get(target, prop, receiver) * 2
        }
      }
      const proxy = new _Proxy(target, handler)
      expect(proxy.a).toBe(2)
    })
  })
})
