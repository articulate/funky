const merge        = require('ramda/src/merge')
const combineWithP = require('./combineWithP')

// combineP :: ({ k: v } -> Promise { k: v }) -> { k: v } -> Promise { k: v }
module.exports = combineWithP(merge)
