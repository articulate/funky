const call    = require('ramda/src/call')
const curry   = require('ramda/src/curry')
const juxt    = require('ramda/src/juxt')
const max     = require('ramda/src/max')
const zipWith = require('ramda/src/zipWith')

// batch :: { k: v } -> ([a] -> Promise [b]) -> a -> Promise b
const batch = (opts={}, f) => {
  const {
    limit = Infinity,
    wait  = 32
  } = opts

  let args     = []
  let last     = 0
  let rejects  = []
  let resolves = []
  let timeout  = 0
  let uniq     = new Map()

  const batched = arg => {
    if (uniq.has(arg)) {
      return uniq.get(arg)
    } else {
      const promise = new Promise((res, rej) => {
        args.push(arg)
        rejects.push(rej)
        resolves.push(res)
      })

      uniq.set(arg, promise)

      if (args.length >= limit) run()

      else if (!timeout) {
        const delta = new Date() - last
        timeout = setTimeout(run, max(0, wait - delta))
      }

      return promise
    }
  }

  const run = () => {
    Promise.resolve(args)
      .then(f)
      .then(zipWith(call, resolves))
      .catch(juxt(rejects))

    clearTimeout(timeout)
    args     = []
    last     = +new Date()
    rejects  = []
    resolves = []
    timeout  = 0
    uniq.clear()
  }

  return batched
}

module.exports = curry(batch)
