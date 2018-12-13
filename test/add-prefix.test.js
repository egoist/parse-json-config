const addPrefix = require('../src/add-prefix')

test('normalize', () => {
  expect(addPrefix('foo')).toBe('foo')
  expect(addPrefix('babel-preset-foo')).toBe('babel-preset-foo')
  expect(addPrefix('foo', 'babel-preset-')).toBe('babel-preset-foo')
  expect(addPrefix('@foo/bar', 'babel-preset-')).toBe('@foo/babel-preset-bar')
  expect(addPrefix('@foo/babel-preset-bar', 'babel-preset-')).toBe(
    '@foo/babel-preset-bar'
  )
})
