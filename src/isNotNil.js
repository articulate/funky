const { complement, isNil } = require('ramda')

// isNotNil :: a -> Boolean
const isNotNil = complement(isNil)

module.exports = isNotNil
