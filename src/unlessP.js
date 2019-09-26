const always = require('ramda/src/always')
const curry  = require('ramda/src/curry')
const ifElse = require('ramda/src/ifElse')

// unlessP :: (a -> Promise Boolean) -> (a -> Promise a) -> a -> Promise a
const unlessP = (pred, f, x) => {
  const run = () =>
    Promise.resolve(x).then(f)

  return Promise.resolve(x).then(pred)
    .then(ifElse(Boolean, always(x), run))
}

module.exports = curry(unlessP)
