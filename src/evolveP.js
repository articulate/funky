const curry     = require('ramda/src/curry')
const fromPairs = require('ramda/src/fromPairs')
const identity  = require('ramda/src/identity')
const pair      = require('ramda/src/pair')
const toPairs   = require('ramda/src/toPairs')

const mapP = require('./mapP')

// evolveP : { k: (v -> Promise v) } -> { k: v } -> Promise { k: v }
const evolveP = (transforms, obj) => {
  const transform = ([ key, val ]) => {
    let xfrm = transforms[key]
    const type = typeof xfrm

    xfrm = type === 'function'
      ? xfrm
      : xfrm && type === 'object'
        ? evolveP(xfrm)
        : identity

    return Promise.resolve(val)
      .then(xfrm)
      .then(pair(key))
  }

  return Promise.resolve(toPairs(obj))
    .then(mapP(transform))
    .then(fromPairs)
}

module.exports = curry(evolveP)
