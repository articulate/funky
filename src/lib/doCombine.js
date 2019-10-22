const curryMax = require('./curryMax')

const doCombine = curryMax(2, (mf, f) => f.length)
module.exports = doCombine
