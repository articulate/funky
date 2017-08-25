const { expect } = require('chai')
const property   = require('prop-factory')

const { promisify } = require('..')

const _add = (a, b, done) =>
  done(null, a + b)

// :smh:
class Counter {
  constructor(start=0) {
    this.count = start
  }

  add(step, done) {
    this.count += step
    done(null, this.count)
  }
}

describe('promisify', () => {
  const res = property()

  describe('regular node-style functions with callbacks', () => {
    const add = promisify(_add)

    beforeEach(() =>
      add(1, 2).then(res)
    )

    it('promisifies them', () =>
      expect(res()).to.equal(3)
    )
  })

  describe('node-style class methods :smh:', () => {
    const counter = new Counter(2)
    const add = promisify(counter.add, counter)

    beforeEach(() =>
      add(3).then(res)
    )

    it('binds the supplied context when promisifying', () =>
      expect(res()).to.equal(5)
    )
  })
})
