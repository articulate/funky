const curry     = require('ramda/src/curry')
const lensIndex = require('ramda/src/lensIndex')
const nth       = require('ramda/src/nth')
const pair      = require('ramda/src/pair')
const pipeP     = require('ramda/src/pipeP')

const combineWithP = require('./combineWithP')
const overP = require('./overP')

// onSuccessP :: (a -> Promise e b) -> (a -> c) -> Promise b
const onSuccessP = (afterThisP, that, data) => pipeP(
  combineWithP(pair, afterThisP),
  overP(lensIndex(0), that),
  nth(1)
)(data)

module.exports = curry(onSuccessP)
