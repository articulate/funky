const curry  = require('ramda/src/curry')
const map    = require('ramda/src/map')
const thrush = require('ramda/src/applyTo')

// assemble :: { k: (v -> v) } -> v -> { k: v }
const assemble = (xfrms, x) => {
  const transform = xfrm => {
    const type = typeof xfrm
    return type === 'function'
      ? xfrm(x)
      : xfrm && type === 'object'
        ? assemble(xfrm, x)
        : xfrm
  }

  return map(transform, xfrms)
}

module.exports = curry(assemble)
