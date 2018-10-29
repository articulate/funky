const always = require('ramda/src/always')
const apply = require('ramda/src/apply')
const compose = require('ramda/src/compose')
const cond = require('ramda/src/cond')
const curryN = require('ramda/src/curryN')
const fromPairs = require('ramda/src/fromPairs')
const identity = require('ramda/src/identity')
const is = require('ramda/src/is')
const map = require('ramda/src/map')
const pair = require('ramda/src/pair')
const T = require('ramda/src/T')
const toPairs = require('ramda/src/toPairs')

const doAssemble = require('./lib/doAssemble')
const juxtP = require('./juxtP')
const mapP = require('./mapP')

// assembleP :: { k: ((...v) -> Promise v) } -> (...v) -> Promise { k: v }
const assembleP = (xfrms, ...args) =>
  apply(handle(xfrms), args)

const _assembleP = curryN(2, assembleP)

const _assembleArrayP =
  compose(juxtP, map(_assembleP))

const _assembleObjP = xfrms => (...args) => {
  const transformObj = ([ key, xfrm ]) =>
    Promise.resolve(args)
      .then(apply(handle(xfrm)))
      .then(pair(key))

  return Promise.resolve(toPairs(xfrms))
    .then(mapP(transformObj))
    .then(fromPairs)
}

const handle =
  cond([
    [ is(Function), identity ],
    [ is(Array), _assembleArrayP ],
    [ is(Object), _assembleObjP ],
    [ T, always ]
  ])

module.exports = doAssemble(assembleP)
