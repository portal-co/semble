import { describe, it, expect } from 'vitest'
import { _ArrayBuffer, _DataView } from '../dataview/index.ts'

describe('ArrayBuffer polyfill', () => {
  describe('construction', () => {
    it('should create an ArrayBuffer with specified length', () => {
      const buffer = new _ArrayBuffer(8)
      expect(buffer.byteLength).toBe(8)
    })

    it('should throw for negative length', () => {
      expect(() => new _ArrayBuffer(-1)).toThrow(RangeError)
    })

    it('should initialize with zeros', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      expect(view.getUint8(0)).toBe(0)
      expect(view.getUint8(1)).toBe(0)
      expect(view.getUint8(2)).toBe(0)
      expect(view.getUint8(3)).toBe(0)
    })
  })

  describe('slice', () => {
    it('should slice the buffer', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      view.setUint8(2, 42)
      
      const sliced = buffer.slice(2, 5)
      expect(sliced.byteLength).toBe(3)
      
      const slicedView = new _DataView(sliced)
      expect(slicedView.getUint8(0)).toBe(42)
    })
  })
})

describe('DataView polyfill', () => {
  describe('construction', () => {
    it('should create a DataView', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      expect(view.byteLength).toBe(8)
      expect(view.byteOffset).toBe(0)
    })

    it('should create a DataView with offset', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer, 2)
      expect(view.byteLength).toBe(6)
      expect(view.byteOffset).toBe(2)
    })

    it('should create a DataView with offset and length', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer, 2, 4)
      expect(view.byteLength).toBe(4)
      expect(view.byteOffset).toBe(2)
    })

    it('should throw if not initialized with ArrayBuffer', () => {
      expect(() => new _DataView({})).toThrow(TypeError)
    })

    it('should throw for negative offset', () => {
      const buffer = new _ArrayBuffer(8)
      expect(() => new _DataView(buffer, -1)).toThrow(RangeError)
    })
  })

  describe('Uint8 operations', () => {
    it('should set and get Uint8 values', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setUint8(0, 255)
      view.setUint8(1, 128)
      view.setUint8(2, 64)
      
      expect(view.getUint8(0)).toBe(255)
      expect(view.getUint8(1)).toBe(128)
      expect(view.getUint8(2)).toBe(64)
    })
  })

  describe('Int8 operations', () => {
    it('should set and get Int8 values', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setInt8(0, -128)
      view.setInt8(1, 127)
      view.setInt8(2, -1)
      
      expect(view.getInt8(0)).toBe(-128)
      expect(view.getInt8(1)).toBe(127)
      expect(view.getInt8(2)).toBe(-1)
    })
  })

  describe('Uint16 operations', () => {
    it('should set and get Uint16 values (little endian)', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setUint16(0, 0x1234, true)
      expect(view.getUint16(0, true)).toBe(0x1234)
    })

    it('should set and get Uint16 values (big endian)', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setUint16(0, 0x1234, false)
      expect(view.getUint16(0, false)).toBe(0x1234)
    })
  })

  describe('Int16 operations', () => {
    it('should set and get Int16 values', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setInt16(0, -32768, true)
      view.setInt16(2, 32767, true)
      
      expect(view.getInt16(0, true)).toBe(-32768)
      expect(view.getInt16(2, true)).toBe(32767)
    })
  })

  describe('Uint32 operations', () => {
    it('should set and get Uint32 values', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      
      view.setUint32(0, 0x12345678, true)
      expect(view.getUint32(0, true)).toBe(0x12345678)
    })
  })

  describe('Int32 operations', () => {
    it('should set and get Int32 values', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      
      view.setInt32(0, -2147483648, true)
      view.setInt32(4, 2147483647, true)
      
      expect(view.getInt32(0, true)).toBe(-2147483648)
      expect(view.getInt32(4, true)).toBe(2147483647)
    })
  })

  describe('Float32 operations', () => {
    it('should set and get Float32 values', () => {
      const buffer = new _ArrayBuffer(8)
      const view = new _DataView(buffer)
      
      view.setFloat32(0, 3.14, true)
      const value = view.getFloat32(0, true)
      expect(Math.abs(value - 3.14)).toBeLessThan(0.01)
    })

    it('should handle special float values', () => {
      const buffer = new _ArrayBuffer(12)
      const view = new _DataView(buffer)
      
      view.setFloat32(0, Infinity, true)
      view.setFloat32(4, -Infinity, true)
      view.setFloat32(8, NaN, true)
      
      expect(view.getFloat32(0, true)).toBe(Infinity)
      expect(view.getFloat32(4, true)).toBe(-Infinity)
      expect(isNaN(view.getFloat32(8, true))).toBe(true)
    })
  })

  describe('Float64 operations', () => {
    it('should set and get Float64 values', () => {
      const buffer = new _ArrayBuffer(16)
      const view = new _DataView(buffer)
      
      view.setFloat64(0, 3.141592653589793, true)
      const value = view.getFloat64(0, true)
      expect(Math.abs(value - 3.141592653589793)).toBeLessThan(1e-10)
    })

    it('should handle special double values', () => {
      const buffer = new _ArrayBuffer(24)
      const view = new _DataView(buffer)
      
      view.setFloat64(0, Infinity, true)
      view.setFloat64(8, -Infinity, true)
      view.setFloat64(16, NaN, true)
      
      expect(view.getFloat64(0, true)).toBe(Infinity)
      expect(view.getFloat64(8, true)).toBe(-Infinity)
      expect(isNaN(view.getFloat64(16, true))).toBe(true)
    })
  })

  describe('bounds checking', () => {
    it('should throw when writing past buffer end', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      expect(() => view.setUint32(2, 0x12345678)).toThrow(RangeError)
    })
  })

  describe('endianness', () => {
    it('should respect endianness for multi-byte values', () => {
      const buffer = new _ArrayBuffer(4)
      const view = new _DataView(buffer)
      
      view.setUint16(0, 0x1234, true)
      expect(view.getUint8(0)).toBe(0x34)
      expect(view.getUint8(1)).toBe(0x12)
      
      view.setUint16(2, 0x1234, false)
      expect(view.getUint8(2)).toBe(0x12)
      expect(view.getUint8(3)).toBe(0x34)
    })
  })
})
