const assoc    = require('ramda/src/assoc')
const converge = require('ramda/src/converge')
const dissoc   = require('ramda/src/dissoc')
const hasIn    = require('ramda/src/hasIn')
const prop     = require('ramda/src/prop')
const uncurryN = require('ramda/src/uncurryN')
const when     = require('ramda/src/when')

// rename :: String -> String -> { k: v } -> { k: v }
const rename = (frum, to) =>
  when(hasIn(frum), converge(assoc(to), [ prop(frum), dissoc(frum) ]))

module.exports = uncurryN(3, rename)
