const curry = require('ramda/src/curry')

// renameAll :: { k: v } -> { k: v } -> { k: v }
const renameAll = (renames, obj) => {
  const newObj = {}
  for (let prevKey in obj) {
    const nextKey = renames[prevKey] || prevKey
    if (typeof nextKey === 'object') {
      newObj[prevKey] = renameAll(renames[prevKey], obj[prevKey])
    } else {
      newObj[nextKey] = obj[prevKey]
    }
  }
  return newObj
}

module.exports = curry(renameAll)
