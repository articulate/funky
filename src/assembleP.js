const always    = require('ramda/src/always')
const curry     = require('ramda/src/curry')
const fromPairs = require('ramda/src/fromPairs')
const pair      = require('ramda/src/pair')
const toPairs   = require('ramda/src/toPairs')

const mapP = require('./mapP')

// assembleP :: { k: (v -> Promise v) } -> v -> Promise { k: v }
const assembleP = (xfrms, x) => {
  const transform = ([ key, xfrm ]) => {
    const type = typeof xfrm

    xfrm = type === 'function'
      ? xfrm
      : xfrm && type === 'object'
        ? _assembleP(xfrm)
        : always(xfrm)

    return Promise.resolve(x)
      .then(xfrm)
      .then(pair(key))
  }

  return Promise.resolve(toPairs(xfrms))
    .then(mapP(transform))
    .then(fromPairs)
}

const _assembleP = module.exports = curry(assembleP)
