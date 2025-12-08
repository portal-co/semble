import { describe, it, expect } from 'vitest'
import factory from '../weak-map/factory/index.ts'

describe('WeakMap factory', () => {
  it('should create a WeakMap class', () => {
    const WeakMapClass = factory()
    expect(WeakMapClass).toBeDefined()
    expect(typeof WeakMapClass).toBe('function')
  })

  it('should create functional WeakMap instances', () => {
    const WeakMapClass = factory()
    const wm = new WeakMapClass()
    const key = {}
    
    wm.set(key, 'test')
    expect(wm.get(key)).toBe('test')
    expect(wm.has(key)).toBe(true)
  })

  it('should use custom symbol ID', () => {
    const customId = '__customWeakMap__'
    const WeakMapClass = factory({ symId: customId })
    const wm = new WeakMapClass()
    const key = {}
    
    wm.set(key, 'value')
    expect(wm.get(key)).toBe('value')
  })

  it('should register polyfill keys', () => {
    const polyfillKeys = {}
    const WeakMapClass = factory({ polyfillKeys })
    expect(Object.keys(polyfillKeys).length).toBeGreaterThan(0)
  })

  it('should work without Proxy and Reflect', () => {
    const WeakMapClass = factory({ Proxy: undefined, Reflect: undefined })
    const wm = new WeakMapClass()
    const key = {}
    
    wm.set(key, 'value')
    expect(wm.get(key)).toBe('value')
  })

  it('should handle multiple instances with separate storage', () => {
    const WeakMapClass = factory()
    const wm1 = new WeakMapClass()
    const wm2 = new WeakMapClass()
    const key = {}
    
    wm1.set(key, 'value1')
    wm2.set(key, 'value2')
    
    expect(wm1.get(key)).toBe('value1')
    expect(wm2.get(key)).toBe('value2')
  })

  it('should support delete operation', () => {
    const WeakMapClass = factory()
    const wm = new WeakMapClass()
    const key = {}
    
    wm.set(key, 'value')
    expect(wm.has(key)).toBe(true)
    
    wm.delete(key)
    expect(wm.has(key)).toBe(false)
    expect(wm.get(key)).toBeUndefined()
  })
})
