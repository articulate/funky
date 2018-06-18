const assoc    = require('ramda/src/assoc')
const converge = require('ramda/src/converge')
const curry    = require('ramda/src/curry')
const dissoc   = require('ramda/src/dissoc')
const hasIn    = require('ramda/src/hasIn')
const prop     = require('ramda/src/prop')
const when     = require('ramda/src/when')

// rename :: String -> String -> { k: v } -> { k: v }
const rename = (frum, to, obj) =>
  when(hasIn(frum), converge(assoc(to), [ prop(frum), dissoc(frum) ]))(obj)

module.exports = curry(rename)
