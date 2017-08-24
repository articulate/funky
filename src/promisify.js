// promisify : ((a..., b -> ()) -> (), c) -> a... -> Promise b
const promisify = (f, ctx) => (...args) =>
  new Promise((res, rej) => {
    f.call(ctx, ...args, (err, val) => err ? rej(err) : res(val))
  })

module.exports = promisify
