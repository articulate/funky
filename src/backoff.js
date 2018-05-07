const apply  = require('ramda/src/apply')
const curry  = require('ramda/src/curry')
const ifElse = require('ramda/src/ifElse')
const T      = require('ramda/src/T')

const reject = Promise.reject.bind(Promise)

// backoff :: { k: v } -> (a... -> Promise b) -> a... -> Promise b
const backoff = (opts={}, f) => {
  const {
    base  = 250,
    tries = Infinity,
    when  = T
  } = opts

  const backedOff = (...args) => {
    let attempt = 0

    const retry = () =>
      new Promise((res, rej) => {
        setTimeout(() => {
          run().then(res, rej)
        }, delay(base, attempt))
      })

    const run = () =>
      Promise.resolve(args)
        .then(apply(f))
        .catch(ifElse(when, tryAgain, reject))

    const tryAgain = err =>
      ++attempt < tries ? retry() : reject(err)

    return run()
  }

  return backedOff
}

const delay = (base, attempt) =>
  attempt && randBetween(0, base * Math.pow(2, attempt))

const randBetween = (lo, hi) =>
  lo + Math.random() * (hi - lo)

module.exports = curry(backoff)
