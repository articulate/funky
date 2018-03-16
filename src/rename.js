const assoc    = require('ramda/src/assoc')
const converge = require('ramda/src/converge')
const curry    = require('ramda/src/curry')
const dissoc   = require('ramda/src/dissoc')
const prop     = require('ramda/src/prop')

// rename :: String -> String -> { k: v } -> { k: v }
const rename = (from, to, obj) =>
  converge(assoc(to), [ prop(from), dissoc(from) ])(obj)

module.exports = curry(rename)
