import { describe, it, expect } from 'vitest'
import { hide, isPolyfillKey, protoChained, polyfillKeys } from '../common/index.ts'

describe('common module', () => {
  describe('hide', () => {
    it('should hide property from enumeration', () => {
      const obj = { visible: 1, toHide: 2 }
      hide(obj, 'toHide')
      const keys = Object.keys(obj)
      expect(keys).not.toContain('toHide')
      expect(obj.toHide).toBe(2)
    })
  })

  describe('isPolyfillKey', () => {
    it('should return false for regular keys', () => {
      expect(isPolyfillKey('normalKey')).toBeFalsy()
    })

    it('should return true for keys in polyfillKeys', () => {
      polyfillKeys['testKey'] = true
      expect(isPolyfillKey('testKey')).toBe(true)
    })
  })

  describe('protoChained', () => {
    it('should traverse prototype chain to find property', () => {
      const parent = { parentProp: 'parent' }
      const child = Object.create(parent)
      child.childProp = 'child'

      const getter = protoChained((obj, key) => obj[key])
      expect(getter(child, 'childProp')).toBe('child')
      expect(getter(child, 'parentProp')).toBe('parent')
    })

    it('should throw when property not found in chain', () => {
      const obj = { prop: 'value' }
      const getter = protoChained((obj, key) => obj[key])
      expect(() => getter(obj, 'nonExistent')).toThrow()
    })
  })
})
