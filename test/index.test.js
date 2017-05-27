/* eslint-disable func-names */
const parse = require('../')

describe('array', () => {
  test('array of functions', () => {
    const config = parse([
      function foo() {
        return 'foo'
      },
      function bar() {
        return 'bar'
      }
    ])
    expect(config).toEqual(['foo', 'bar'])
  })

  test('array of functions with options', () => {
    const config = parse([
      [
        function foo(options) {
          return options
        },
        1
      ],
      function bar() {
        return 'bar'
      }
    ])
    expect(config).toEqual([1, 'bar'])
  })

  test('array of strings', () => {
    const config = parse(['./test/fixture/foo', './test/fixture/bar'])
    expect(config).toEqual(['foo', 'bar'])
  })

  test('array of strings with options', () => {
    const config = parse([
      ['./test/fixture/foo-options', 1],
      './test/fixture/bar'
    ])
    expect(config).toEqual([1, 'bar'])
  })
})

describe('object', () => {
  test('local path', () => {
    const config = parse({
      './test/fixture/foo-options.js': 1,
      './test/fixture/bar.js': {}
    })
    expect(config).toEqual([1, 'bar'])
  })
})
