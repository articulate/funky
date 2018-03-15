const merge =       require('ramda/src/merge')
const combineWith = require('./combineWith')

// combine :: ({ k: v } -> { k: v }) -> { k: v } -> { k: v }
module.exports = combineWith(merge)
