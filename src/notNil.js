const { complement, isNil } = require('ramda')

// notNil :: a -> Boolean
const notNil = complement(isNil)

module.exports = notNil
