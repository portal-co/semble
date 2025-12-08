import { describe, it, expect } from 'vitest'
import { _WeakMap } from '../weak-map/index.ts'

describe('WeakMap polyfill', () => {
  describe('basic operations', () => {
    it('should create a new WeakMap instance', () => {
      const wm = new _WeakMap()
      expect(wm).toBeDefined()
    })

    it('should set and get values', () => {
      const wm = new _WeakMap()
      const key = {}
      const value = { data: 'test' }
      wm.set(key, value)
      expect(wm.get(key)).toBe(value)
    })

    it('should return undefined for non-existent keys', () => {
      const wm = new _WeakMap()
      const key = {}
      expect(wm.get(key)).toBeUndefined()
    })

    it('should check if key exists', () => {
      const wm = new _WeakMap()
      const key = {}
      expect(wm.has(key)).toBe(false)
      wm.set(key, 'value')
      expect(wm.has(key)).toBe(true)
    })

    it('should delete entries', () => {
      const wm = new _WeakMap()
      const key = {}
      wm.set(key, 'value')
      expect(wm.has(key)).toBe(true)
      wm.delete(key)
      expect(wm.has(key)).toBe(false)
    })
  })

  describe('multiple instances', () => {
    it('should maintain separate storage for different instances', () => {
      const wm1 = new _WeakMap()
      const wm2 = new _WeakMap()
      const key = {}
      
      wm1.set(key, 'value1')
      wm2.set(key, 'value2')
      
      expect(wm1.get(key)).toBe('value1')
      expect(wm2.get(key)).toBe('value2')
    })
  })

  describe('object keys', () => {
    it('should work with different object types', () => {
      const wm = new _WeakMap()
      const obj = {}
      const arr = []
      const func = function() {}
      
      wm.set(obj, 'object')
      wm.set(arr, 'array')
      wm.set(func, 'function')
      
      expect(wm.get(obj)).toBe('object')
      expect(wm.get(arr)).toBe('array')
      expect(wm.get(func)).toBe('function')
    })
  })
})
