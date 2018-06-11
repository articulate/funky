const curry = require('ramda/src/curry')

// renameAll :: { k: v } -> { k: v } -> { k: v }
const renameAll = (renames, obj) => {
  obj = Object.assign({}, obj)

  for (let frum in renames) {
    if (!(frum in obj)) continue

    const to = renames[frum]

    if (typeof to === 'object') {
      obj[frum] = renameAll(to, obj[frum])
    } else {
      obj[to] = obj[frum]
      delete obj[frum]
    }
  }

  return obj
}

module.exports = curry(renameAll)
