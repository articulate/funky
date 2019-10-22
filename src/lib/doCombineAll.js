const curryMax = require('./curryMax')
const maxArity = require('./maxArity')

const doCombineAll = curryMax(1, maxArity)
module.exports = doCombineAll
