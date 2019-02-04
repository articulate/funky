const Spy             = require('@articulate/spy')
const { expect }      = require('chai')
const { onSuccessP }  = require('..')

describe('onSuccessP', () => {
  const spy1 = Spy()
  const spy2 = Spy()

  beforeEach(() => {
    spy1.reset()
    spy2.reset()
  })

  it('executes promise returning second function after promise returning first function resolves', () => {
    const afterThis = a => Promise.resolve(a)
      .then(spy1)
      .then(() => 'b')

    const doThat = a => Promise.resolve(a)
      .then(spy2)
      .then(() => 'c')

    return onSuccessP(afterThis, doThat, 'a')
      .then(result => {
        expect(result).to.eql('b')

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(1)
        expect(spy2.calls[0]).to.eql([ 'a' ])
      })
  })

  it('executes non-promise returning second function after promise returning first function resolves', () => {
    const afterThis = a => Promise.resolve(a)
      .then(spy1)
      .then(() => 'b')

    const doThat = a => {
      spy2(a)
      return 'c'
    }

    return onSuccessP(afterThis, doThat, 'a')
      .then(result => {
        expect(result).to.eql('b')

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(1)
        expect(spy2.calls[0]).to.eql([ 'a' ])
      })
  })

  it('executes promise returning second function after non-promise returning first function returns', () => {
    const afterThis = a => {
      spy1(a)
      return 'b'
    }

    const doThat = a => Promise.resolve(a)
      .then(spy2)
      .then(() => 'c')

    return onSuccessP(afterThis, doThat, 'a')
      .then(result => {
        expect(result).to.eql('b')

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(1)
        expect(spy2.calls[0]).to.eql([ 'a' ])
      })
  })

  it('is auto-curried', () => {
    const afterThis = a => Promise.resolve(a)
      .then(spy1)
      .then(() => 'b')

    const doThat = a => Promise.resolve(a)
      .then(spy2)
      .then(() => 'c')

    let test = onSuccessP(afterThis, doThat)

    return test('a')
      .then(result => {
        expect(result).to.eql('b')

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(1)
        expect(spy2.calls[0]).to.eql([ 'a' ])
      })
  })

  it('does not execute promise returning second function when promise returning first function rejects', done => {
    const error = new Error('b')

    const afterThis = a => Promise.resolve(a)
      .then(spy1)
      .then(() => { throw error })

    const doThat = a => Promise.resolve(a)
      .then(spy2)
      .then(() => 'c')

    onSuccessP(afterThis, doThat, 'a')
      .then(() => done('Unexpected Success'))
      .catch(e => {
        expect(e).to.eql(error)

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(0)

        done()
      })
  })

  it('does not execute non-promise returning second function when promise returning first function rejects', done => {
    const error = new Error('b')

    const afterThis = a => Promise.resolve(a)
      .then(spy1)
      .then(() => { throw error })

    const doThat = a => {
      spy2(a)
      return 'c'
    }

    onSuccessP(afterThis, doThat, 'a')
      .then(() => done('Unexpected Success'))
      .catch(e => {
        expect(e).to.eql(error)

        expect(spy1.calls.length).to.eql(1)
        expect(spy1.calls[0]).to.eql([ 'a' ])

        expect(spy2.calls.length).to.eql(0)

        done()
      })
  })

  it('does not execute promise returning second function when non-promise returning first function throws', done => {
    const error = new Error('b')

    const afterThis = a => {
      spy1(a)
      throw error
    }

    const doThat = a => Promise.resolve(a)
      .then(spy2)
      .then(() => 'c')

    try {
      onSuccessP(afterThis, doThat, 'a')
        .then(() => done('Unexpected Success'))
    } catch (e) {
      expect(e).to.eql(error)

      expect(spy1.calls.length).to.eql(1)
      expect(spy1.calls[0]).to.eql([ 'a' ])

      expect(spy2.calls.length).to.eql(0)

      done()
    }
  })
})
