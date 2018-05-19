# parse-json-config

[![NPM version](https://img.shields.io/npm/v/parse-json-config.svg?style=flat)](https://npmjs.com/package/parse-json-config) [![NPM downloads](https://img.shields.io/npm/dm/parse-json-config.svg?style=flat)](https://npmjs.com/package/parse-json-config) [![CircleCI](https://circleci.com/gh/egoist/parse-json-config/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/parse-json-config/tree/master)  [![codecov](https://codecov.io/gh/egoist/parse-json-config/branch/master/graph/badge.svg)](https://codecov.io/gh/egoist/parse-json-config)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
yarn add parse-json-config
```

## Usage

```js
const parse = require('parse-json-config')

parse([
  'foo',
  'bar'
])
//=> return
[
  require('$cwd/node_modules/foo')(),
  require('$cwd/node_modules/bar')()
]
```

### Use options

To provide options while calling the function:

```js
parse([
  ['foo', options],
  'bar'
])
//=> return
[
  require('$cwd/node_modules/foo')(options),
  require('$cwd/node_modules/bar')()
]
```

### Local path or function

You can also use a local path or function:

```js
parse([
  function () { return 'foo' },
  ['./bar.js', options]
])
//=> return
[
  function () { return 'foo' },
  require('$cwd/bar.js')(options)
]
```

If you're using a non-string, we directly return it without calling it with the options even if you provide it as `[resolved, options]`, since if you can use a function / object as `resolved` you can already execute it yourself, but there's also a [isCalled](#iscalled) option for you to customize it.

By default relative path is resolve from `process.cwd()`

### Custom caller

Each item in the config is in `name` or `[name, options]` format, by default we directly call the `name` with `option` as the only argument, but you can use a custom caller:

```js
parse([
  './foo.js'
], {
  caller: (resolved, options) => resolved(options, 'hi')
})
//=> return
[
  require('$cwd/foo.js')(options, 'hi')
]
```

Default caller is `(resolved, options) => typeof resolved === 'object' ? resolve.apply(options) : resolved(options)`

### Prefix

Use a prefix:

```js
parse([
  'es2015',
  'babel-preset-stage-2',
  '@scope/my-preset',
], { prefix: 'babel-preset-' })
//=> return
[
  require('$cwd/node_modules/babel-preset-es2015')(),
  require('$cwd/node_modules/babel-preset-stage-2')(),
  require('$cwd/node_modules/@scope/my-preset')(),
]
```

_Note: If the path is scoped (ie @scope/my-preset), prefix will be ignored_

### Pure object

**Use pure object as config:**

Similar to using an array:

```js
[
  ['foo', options],
  ['./bar.js', {
    isBar: true
  }]
]
```

is equivalent to:

```js
{
  'foo': options,
  './bar.js': {
    isBar: true
  }
}
```

## API

### parse(config, [options])

#### options

##### cwd

Type: `string`<br>
Default: `process.cwd()`

The path to resolve relative path and npm packages.

##### caller

Type: `function`<br>
Default: `(resolved, options) => resolved(options)`

The caller defines what to do with `resolved` and `options`.

##### prefix

Type: `string`<br>
Default: `undefined`

Prefix for package name.

##### isCalled

Type: `function`<br>
Default: `() => true`

Check if a function is called with options, by default considering all functions as called, but you can customize it:

```js
parse([
  function foo() { return 'foo' },
  function bar() { return 'bar' }
], {
  // Only used when config item is provided as function
  isCalled(fn) {
    // Consider it's called when its name is foo
    return fn.name === 'foo'
  }
})
//=> return
[
  function foo() { return 'foo' },
  'bar'
]
// function bar will be called as `bar(options)`
```

`fn` is always a function.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**parse-json-config** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/parse-json-config/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
