/**
 * Check if it is a local path
 * @param {string} input
 * @returns {boolean}
 */
function isLocalPath(input) {
  return /^[./]|(^[a-zA-Z]:)/.test(input)
}

/**
 * Check if a package is scoped package
 * @param {string} input
 * @returns {boolean}
 */
function isScoped(input) {
  return input.startsWith('@')
}

/**
 * @param {string} input
 * @param {string} prefix
 * @returns {string}
 */
module.exports = (input, prefix) => {
  if (isLocalPath(input) || !prefix) {
    return input
  }

  if (isScoped(input)) {
    const RE = new RegExp(`/(${prefix})?`)
    return input.replace(RE, `/${prefix}`)
  }

  const RE = new RegExp(`^(${prefix})?`)
  return input.replace(RE, prefix)
}
