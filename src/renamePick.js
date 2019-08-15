const curry = require('ramda/src/curry')

// renamePick :: { k: v } -> { k: v } -> { k: v }
const renamePick = (renames, obj) => {
  const res = {}

  for (let frum in renames) {
    if (!(frum in obj)) continue

    const to = renames[frum]

    if (typeof to === 'object') {
      res[frum] = renamePick(to, obj[frum])
    } else {
      res[to] = obj[frum]
    }
  }

  return res
}

module.exports = curry(renamePick)
