const always    = require('ramda/src/always')
const cond      = require('ramda/src/cond')
const curry     = require('ramda/src/curry')
const curryN    = require('ramda/src/curryN')
const length    = require('ramda/src/length')
const map       = require('ramda/src/map')
const T         = require('ramda/src/T')
const transduce = require('ramda/src/transduce')
const values    = require('ramda/src/values')

const isTypeOf = curry((type, x) => typeof x === type)

const getAssembleLength = xfrms =>
  transduce(map(getLength), Math.max, 0, values(xfrms))

const getLength = cond([
  [ isTypeOf('object'),   getAssembleLength ],
  [ isTypeOf('function'), length            ],
  [ T,                    always(0)         ],
])

const doAssemble = (assemble, xfrms, ...x) => {
  const len = getAssembleLength(xfrms)
  const fn = curryN(len + 1, assemble)
  if (x.length === 0) {
    if (len === 0) {
      // explicity return a function with arity 0 that will spread args
      return (...y) => fn(xfrms, ...y)
    }
    return fn(xfrms)
  }
  return fn(xfrms, ...x)
}

module.exports = curry(doAssemble)
