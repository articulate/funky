const { curryN, fromPairs, identity, pair, toPairs } = require('ramda')

const mapP = require('./mapP')

// evolveP : { k: (v -> Promise v) } -> { k: v } -> Promise { k: v }
const evolveP = curryN(2, (transforms, obj) => {
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
})

module.exports = evolveP
