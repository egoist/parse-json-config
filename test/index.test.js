/* eslint-disable func-names */
const parse = require('../lib')

describe('array', () => {
  test('array of functions', () => {
    const input = [
      function foo() {
        return 'foo'
      },
      function bar() {
        return 'bar'
      }
    ]
    const config = parse(input)
    expect(config).toEqual(input)
  })

  test('array of strings', () => {
    const config = parse([
      './test/fixture/foo',
      './test/fixture/bar',
      '@test/stub'
    ])
    expect(config).toEqual(['foo', 'bar', 'scoped'])
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

describe('prefixed', () => {
  test('ignores scoped packages', () => {
    const config = parse(['stub', '@test/stub'], { prefix: 'prefix-' })
    expect(config).toEqual(['prefixed', 'scoped-prefixed'])
  })
})
