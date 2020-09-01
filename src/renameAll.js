const curry = require('ramda/src/curry')

// renameAll :: { k: v } -> { k: v } -> { k: v }
const renameAll = (renames, obj) => {
  const newObj = {}
  const tosMap = {}

  for (let k in obj) {
    newObj[k] = obj[k]
  }

  for (let frum in renames) {
    if (!(frum in obj)) {
      continue
    }

    const to = renames[frum]

    if (typeof to === 'object') {
      newObj[frum] = renameAll(to, obj[frum])
    } else {
      tosMap[to] = true
      newObj[to] = obj[frum]

      if (!tosMap[frum]) {
        delete newObj[frum]
      }
    }
  }

  return newObj
}

module.exports = curry(renameAll)
