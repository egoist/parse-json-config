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
  require('foo')(),
  require('bar')()
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
  require('foo')(options),
  require('bar')()
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
  'foo',
  require('./bar.js')(options)
]
```

By default relative path is resolve from `process.cwd()`

### Custom caller

Each item in the config is in `name` or `[name, options]` format, by default we directly call the `name` with `option` as the only argument, but you can use a custom caller:

```js
parse([
  (options, extra) => extra || options
], {
  caller: (fn, options) => fn(options, 'hi')
})
//=> return
[
  'hi'
]
```

Default caller is `(fn, options) => fn(options)`

### Prefix

Use a prefix:

```js
parse([
  'es2015',
  'babel-preset-stage-2'
], { prefix: 'babel-preset-' })
//=> return
[
  require('babel-preset-es2015')(),
  require('babel-preset-stage-2')()
]
```

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
Default: `(fn, options) => fn(options)`

The caller the execute resolved function and options

##### prefix

Type: `string`<br>
Default: `undefined`

Prefix for package name.

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
