// isNotNil :: a -> Boolean
const isNotNil =
  x => x != null && !Number.isNaN(x)

module.exports = isNotNil
