// promisify :: ((a..., b -> ()) -> (), c) -> a... -> Promise b
const promisify = (f, ctx) => (...args) =>
  new Promise((res, rej) => {
    const cb = (err, val) => err ? rej(err) : res(val)
    f.call(ctx, ...args, cb)
  })

module.exports = promisify
