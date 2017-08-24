const bind    = require('ramda/src/bind')
const compose = require('ramda/src/compose')
const is      = require('ramda/src/is')
const unless  = require('ramda/src/unless')

// reject : a -> Promise Error
const reject = compose(bind(Promise.reject, Promise), unless(is(Error), Error))

module.exports = reject
