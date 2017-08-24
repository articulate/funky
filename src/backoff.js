const apply = require('ramda/src/apply')
const curry = require('ramda/src/curry')

const { slice } = Array.prototype

// backoff : Number -> Number -> (a... -> Promise b) -> a... -> Promise b
const backoff = (base, tries, f) =>
  function() {
    const args = slice.call(arguments)
    let attempt = 0

    const retry = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Promise.resolve(args)
            .then(apply(f))
            .then(resolve)
            .catch(tryAgain)
            .catch(reject)
        }, delay(base, attempt))
      })

    const tryAgain = err =>
      ++attempt < tries ? retry() : Promise.reject(err)

    return retry()
  }

const delay = (base, attempt) =>
  attempt && randBetween(0, base * Math.pow(2, attempt))

const randBetween = (lo, hi) =>
  lo + Math.random() * (hi - lo)

module.exports = curry(backoff)
