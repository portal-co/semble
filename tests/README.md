# Test Suite Documentation

This test suite provides comprehensive coverage for the Semble polyfill library, which provides polyfills for ES6+ features like Proxy, Reflect, WeakMap, ArrayBuffer, and DataView.

## Test Summary

- **Total Test Files:** 9
- **Total Tests:** 76
- **All Tests Passing:** ✅

## Test Files

### 1. `example.test.js` (1 test)
Basic sanity test to ensure the test framework is working correctly.

### 2. `common.test.js` (5 tests)
Tests for common utility functions:
- `hide()` - Makes object properties non-enumerable
- `isPolyfillKey()` - Checks if a key is a polyfill key
- `protoChained()` - Traverses prototype chain to find properties

### 3. `core-support.test.js` (12 tests)
Tests for core support functions used throughout the library:
- `desc()` - Gets property descriptors with prototype chain traversal
- `descGet()` - Gets property values using descriptors
- `descSet()` - Sets property values using descriptors
- `setNonEnumerableBaseline()` - Creates non-enumerable properties

### 4. `weak-map.test.js` (7 tests)
Tests for the WeakMap polyfill:
- Basic operations: set, get, has, delete
- Multiple instances with separate storage
- Support for different object types as keys

### 5. `weak-map-factory.test.js` (7 tests)
Tests for the WeakMap factory function:
- Factory function creation
- Custom symbol ID configuration
- Polyfill key registration
- Working with and without Proxy/Reflect

### 6. `proxy.test.js` (12 tests)
Tests for Proxy and Reflect polyfills:
- Proxy trap interception (get, set, has, apply, construct)
- Reflect operations (get, set, has, apply, construct)
- Integration between Proxy and Reflect

### 7. `proxy-factory.test.js` (2 tests)
Tests for the Proxy factory function:
- Factory function validation
- Function signature verification

### 8. `dataview.test.js` (22 tests)
Comprehensive tests for ArrayBuffer and DataView polyfills:
- ArrayBuffer construction and validation
- ArrayBuffer slicing
- DataView construction with offsets and lengths
- Reading/writing 8-bit, 16-bit, 32-bit integers
- Reading/writing 32-bit and 64-bit floats
- Endianness handling (little/big endian)
- Bounds checking and error handling
- Special floating-point values (Infinity, -Infinity, NaN)

### 9. `integration.test.js` (8 tests)
Integration tests ensuring all polyfills work together:
- Proxy with WeakMap state management
- DataView with ArrayBuffer for binary data
- Proxy with ArrayBuffer access control
- Complete polyfill stack with nested structures
- Edge cases (empty buffers, proxy chains, multiple key types)

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npx vitest

# Run tests with coverage
npx vitest --coverage
```

## Test Coverage

The test suite covers:

1. **Core Functionality**: All major API methods are tested
2. **Edge Cases**: Empty buffers, null values, boundary conditions
3. **Integration**: Tests ensure modules work together correctly
4. **Error Handling**: Proper error types and messages are validated
5. **Data Types**: All numeric types and special values are tested
6. **Endianness**: Both little-endian and big-endian operations

## Test Framework

- **Framework**: Vitest
- **Configuration**: `vitest.config.js`
- **Test Pattern**: `tests/**/*.test.*`
- **Environment**: Node.js

## Contributing

When adding new features:
1. Add corresponding tests in the appropriate test file
2. Ensure all existing tests still pass
3. Aim for comprehensive coverage of edge cases
4. Add integration tests if multiple modules are affected
