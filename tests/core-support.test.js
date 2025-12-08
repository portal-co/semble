import { describe, it, expect } from 'vitest'
import { desc, descGet, descSet, setNonEnumerableBaseline } from '../common/core_support.ts'

describe('core_support module', () => {
  describe('desc', () => {
    it('should get property descriptor for own property', () => {
      const obj = { a: 1 }
      const descriptor = desc(obj, 'a')
      expect(descriptor).toBeDefined()
      expect(descriptor.value).toBe(1)
    })

    it('should return null for non-existent property', () => {
      const obj = { a: 1 }
      const descriptor = desc(obj, 'nonExistent')
      expect(descriptor).toBeNull()
    })

    it('should traverse prototype chain', () => {
      const parent = { inherited: 'value' }
      const child = Object.create(parent)
      child.own = 'ownValue'
      
      const ownDesc = desc(child, 'own')
      expect(ownDesc).toBeDefined()
      expect(ownDesc.value).toBe('ownValue')
      
      const inheritedDesc = desc(child, 'inherited')
      expect(inheritedDesc).toBeDefined()
      expect(inheritedDesc.value).toBe('value')
    })
  })

  describe('descGet', () => {
    it('should get property value', () => {
      const obj = { a: 1, b: 2 }
      expect(descGet(obj, 'a')).toBe(1)
      expect(descGet(obj, 'b')).toBe(2)
    })

    it('should work with inherited properties', () => {
      const parent = { inherited: 'value' }
      const child = Object.create(parent)
      expect(descGet(child, 'inherited')).toBe('value')
    })

    it('should work with getters', () => {
      const obj = {
        _value: 10,
        get computed() {
          return this._value * 2
        }
      }
      expect(descGet(obj, 'computed')).toBe(20)
    })
  })

  describe('descSet', () => {
    it('should set property value', () => {
      const obj = { a: 1 }
      descSet(obj, 'a', 5)
      expect(obj.a).toBe(5)
    })

    it('should create new property', () => {
      const obj = {}
      descSet(obj, 'newProp', 'newValue')
      expect(obj.newProp).toBe('newValue')
    })

    it('should work with setters', () => {
      let stored = 0
      const obj = {
        set value(v) {
          stored = v * 2
        }
      }
      descSet(obj, 'value', 10)
      expect(stored).toBe(20)
    })
  })

  describe('setNonEnumerableBaseline', () => {
    it('should set non-enumerable property', () => {
      const obj = {}
      setNonEnumerableBaseline(obj, 'hidden', 'value')
      
      expect(obj.hidden).toBe('value')
      const keys = Object.keys(obj)
      expect(keys).not.toContain('hidden')
    })

    it('should return the value', () => {
      const obj = {}
      const result = setNonEnumerableBaseline(obj, 'prop', 42)
      expect(result).toBe(42)
    })

    it('should allow writable by default', () => {
      const obj = {}
      setNonEnumerableBaseline(obj, 'prop', 1)
      obj.prop = 2
      expect(obj.prop).toBe(2)
    })
  })
})
