const { bind, compose, is, unless } = require('ramda')

// reject : a -> Promise Error
const reject = compose(bind(Promise.reject, Promise), unless(is(Error), Error))

module.exports = reject
