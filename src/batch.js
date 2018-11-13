const call    = require('ramda/src/call')
const curry   = require('ramda/src/curry')
const indexBy = require('ramda/src/indexBy')
const juxt    = require('ramda/src/juxt')
const max     = require('ramda/src/max')
const zipWith = require('ramda/src/zipWith')

// batch :: { k: v } -> ([a] -> Promise [b]) -> a -> Promise b
const batch = (opts={}, f) => {
  const {
    inputKey,
    limit = Infinity,
    outputKey,
    wait = 32
  } = opts

  const matching = inputKey && outputKey

  let args     = []
  let last     = 0
  let rejects  = []
  let resolves = matching ? {} : []
  let timeout  = 0
  let uniq     = new Map()

  const addResolve = (arg, res) =>
    matching ? (resolves[inputKey(arg)] = res) : resolves.push(res)

  const batched = arg => {
    if (uniq.has(arg)) {
      return uniq.get(arg)
    } else {
      const promise = new Promise((res, rej) => {
        args.push(arg)
        rejects.push(rej)
        addResolve(arg, res)
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

  const matchResolves = resolves => results => {
    const indexed = indexBy(outputKey, results)
    for (let key in resolves) resolves[key](indexed[key])
  }

  const resolveAll =
    matching ? matchResolves : zipWith(call)

  const run = () => {
    Promise.resolve(args)
      .then(f)
      .then(resolveAll(resolves))
      .catch(juxt(rejects))

    clearTimeout(timeout)
    args     = []
    last     = +new Date()
    rejects  = []
    resolves = matching ? {} : []
    timeout  = 0
    uniq.clear()
  }

  return batched
}

module.exports = curry(batch)
