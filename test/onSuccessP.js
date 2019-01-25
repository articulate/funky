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

  it('executes second function when first resolves, returns output of first function', () => {
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

  it('does not execute second function when first rejects', done => {
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
})
