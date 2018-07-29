const importFrom = require('import-from')

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
    return importFrom(cwd, name)
  }

  if (prefix && !isScopedPath(name)) {
    const re = new RegExp(`^${prefix}`)
    name = re.test(name) ? name : `${prefix}${name}`
  }

  return importFrom(cwd, name)
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
    isResolved = original => original && typeof original !== 'string',
    isCalled = isResolved,
    prefix
  } = {}
) {
  if (!config || typeof config !== 'object') {
    return null
  }

  if (!Array.isArray(config)) {
    config = Object.keys(config).reduce((res, name) => {
      res.push([name, config[name]])
      return res
    }, [])
  }

  return config.map(item => {
    // Ensure it's an array
    if (!Array.isArray(item)) item = [item]

    // If it's function we consider it as already executed
    // Since if you can provide it as a function for example
    // You can directly call it with the options
    // Instead of using `[resolved, options]`
    const resolved = isResolved(item[0])
      ? item[0]
      : resolve(item[0], prefix, cwd)
    return isCalled(item[0], resolved) ? resolved : caller(resolved, item[1])
  })
}
