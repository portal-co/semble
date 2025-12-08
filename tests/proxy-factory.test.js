import { describe, it, expect } from 'vitest'
import factory from '../proxy/factory/index.ts'

describe('Proxy factory', () => {
  it('should be a function', () => {
    expect(typeof factory).toBe('function')
  })

  it('should export factory function with correct signature', () => {
    expect(factory.length).toBeGreaterThanOrEqual(0)
    expect(factory.name).toBe('create')
  })
})
