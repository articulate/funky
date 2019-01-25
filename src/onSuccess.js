const curry     = require('ramda/src/curry')
const lensIndex = require('ramda/src/lensIndex')
const nth       = require('ramda/src/nth')
const over      = require('ramda/src/over')
const pair      = require('ramda/src/pair')
const pipe      = require('ramda/src/pipe')

const combineWith = require('./combineWith')

// onSuccessP :: (a -> b) -> (a -> c) -> b
const onSuccess = (afterThis, that, data) => pipe(
  combineWith(pair, afterThis),
  over(lensIndex(0), that),
  nth(1)
)(data)

module.exports = curry(onSuccess)
