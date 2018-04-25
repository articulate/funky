const curry = require('ramda/src/curry')
const map   = require('ramda/src/map')

const mapArrayP = (f, list) =>
  Promise.all(map(f, list))

const mapObjectP = (f, list) => {
  const result = {}
  const promises = []

  for (const key in list) {
    const p = f(list[key]).then(val => { result[key] = val })
    promises.push(p)
  }

  return Promise.all(promises).then(() => result)
}

// mapP :: Functor f => (a -> Promise b) -> f a -> Promise f b
const mapP = (f, list) => {
  switch (Object.prototype.toString.call(list)) {
    case '[object Object]':
      return mapObjectP(f, list)

    default:
      return mapArrayP(f, list)
  }
}

module.exports = curry(mapP)
