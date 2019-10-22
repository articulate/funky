const transduce = require('ramda/src/transduce')
const map       = require('ramda/src/map')
const length    = require('ramda/src/length')

const maxArity =
  transduce(map(length), Math.max, 0)

module.exports = maxArity
