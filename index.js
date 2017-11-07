const path = require('path')

function isLocalPath(input) {
  return /^[./]|(^[a-zA-Z]:)/.test(input)
}

function isScopedPath(input) {
  return /^@.*\//.test(input)
}

function getFn(name, prefix, cwd) {
  if (typeof name === 'function') {
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

module.exports = function(
  config,
  {
    caller = (fn, options) => fn(options),
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
      // Since if you can provide it as a function
      // You can directly call it with the options
      // Instead of using `[function, options]`
      if (typeof item[0] === 'function' && isCalled(item[0])) return item[0]

      const fn = getFn(item[0], prefix, cwd)
      return caller(fn, item[1])
    })
  } else if (typeof config === 'object') {
    return Object.keys(config).map(name => {
      const options = config[name]
      const fn = getFn(name, prefix, cwd)
      return caller(fn, options)
    })
  }
  return null
}
