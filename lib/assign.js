const { curryN } = require('ramda')

// assign : { k: v } -> { k: v } -> { k: v }
const assign = curryN(2, Object.assign)

module.exports = assign
