const always    = require('ramda/src/always')
const cond      = require('ramda/src/cond')
const curry     = require('ramda/src/curry')
const curryN    = require('ramda/src/curryN')
const length    = require('ramda/src/length')
const map       = require('ramda/src/map')
const T         = require('ramda/src/T')
const transduce = require('ramda/src/transduce')

const isTypeOf = curry((type, x) => typeof x === type)

const getAssembleLength = xfrms =>
  transduce(map(getLength), Math.max, 1, Object.values(xfrms))

const getLength = cond([
  [ isTypeOf('object'),   getAssembleLength ],
  [ isTypeOf('function'), length            ],
  [ T,                    always(0)         ],
])

const doAssemble = curry((assemble, xfrms, ...x) => {
  const fn = curryN(getAssembleLength(xfrms) + 1, assemble)(xfrms)
  return x.length === 0 ? fn : fn(...x)
})

module.exports = doAssemble
