const curryMax = require('./curryMax')
const maxArity = require('./maxArity')

const doCombineAll = curryMax(maxArity)
module.exports = doCombineAll
