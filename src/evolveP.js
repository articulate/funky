const compose   = require('ramda/src/compose')
const composeP  = require('ramda/src/composeP')
const fromPairs = require('ramda/src/fromPairs')
const identity  = require('ramda/src/identity')
const pair      = require('ramda/src/pair')
const toPairs   = require('ramda/src/toPairs')
const uncurryN  = require('ramda/src/uncurryN')

const mapP = require('./mapP')

// evolveP :: { k: (v -> Promise v) } -> { k: v } -> Promise { k: v }
const evolveP = transforms => {
  const transform = ([ key, val ]) => {
    let xfrm = transforms[key]
    const type = typeof xfrm

    xfrm = type === 'function'
      ? xfrm
      : xfrm && type === 'object'
        ? _evolveP(xfrm)
        : identity

    return Promise.resolve(val)
      .then(xfrm)
      .then(pair(key))
  }

  return compose(composeP(fromPairs, mapP(transform)), toPairs)
}

const _evolveP = module.exports = uncurryN(2, evolveP)
