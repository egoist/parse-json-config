const path = require('path')

function isLocalPath(input) {
  return /^[./]|(^[a-zA-Z]:)/.test(input)
}

function isScopedPath(input) {
  return /^@.*\//.test(input)
}

function resolve(name, prefix, cwd) {
  if (typeof name !== 'string') {
    return name
  }

  if (isLocalPath(name)) {
    return require(path.resolve(cwd, name))
  }

  if (prefix && !isScopedPath(name)) {
    const re = new RegExp(`^${prefix}`)
    name = re.test(name) ? name : `${prefix}${name}`
  }

  return require(path.join(cwd, 'node_modules', name))
}

function defaultCaller(resolved, options) {
  return typeof resolved === 'object'
    ? resolve.apply(options)
    : resolved(options)
}

module.exports = function(
  config,
  {
    caller = defaultCaller,
    cwd = process.cwd(),
    isCalled = () => true,
    prefix
  } = {}
) {
  if (Array.isArray(config)) {
    return config.map(item => {
      // Ensure it's an array
      if (!Array.isArray(item)) item = [item]

      // If it's function we consider it as already executed
      // Since if you can provide it as a function for example
      // You can directly call it with the options
      // Instead of using `[resolved, options]`
      if (typeof item[0] !== 'string' && isCalled(item[0])) return item[0]

      const resolved = resolve(item[0], prefix, cwd)
      return caller(resolved, item[1])
    })
  } else if (typeof config === 'object') {
    return Object.keys(config).map(name => {
      const options = config[name]
      const resolved = resolve(name, prefix, cwd)
      return caller(resolved, options)
    })
  }
  return null
}
