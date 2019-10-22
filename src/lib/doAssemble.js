const always    = require('ramda/src/always')
const cond      = require('ramda/src/cond')
const curry     = require('ramda/src/curry')
const length    = require('ramda/src/length')
const map       = require('ramda/src/map')
const T         = require('ramda/src/T')
const transduce = require('ramda/src/transduce')
const values    = require('ramda/src/values')

const curryMax = require('./curryMax')

const isTypeOf = curry((type, x) => typeof x === type)

const getAssembleLength = xfrms =>
  transduce(map(getLength), Math.max, 0, values(xfrms))

const getLength = cond([
  [ isTypeOf('object'),   getAssembleLength ],
  [ isTypeOf('function'), length            ],
  [ T,                    always(0)         ],
])

const doAssemble = curryMax(1, getLength)
module.exports = doAssemble
