const curryN = require('ramda/src/curryN')

const curryMax = (getLength, target, ...params) => {
  const len = getLength(...params)
  const fn = curryN(len + 1, target)
  if (params.length === 1 && len === 0) {
    // explicity return a function with arity 0 that will spread args
    return (...spread) => fn(...params, ...spread)
  }
  return fn(...params)
}

module.exports = curryN(3, curryMax)
