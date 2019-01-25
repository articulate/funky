const Spy             = require('@articulate/spy')
const { expect }      = require('chai')
const { onSuccess }  = require('..')

describe('onSuccess', () => {
  const spy1 = Spy()
  const spy2 = Spy()

  beforeEach(() => {
    spy1.reset()
    spy2.reset()
  })

  it('executes second function when first resolves, returns output of first function', () => {
    const afterThis = a => {
      spy1(a)
      return 'b'
    }

    const doThat = a => {
      spy2(a)
      return 'c'
    }

    const result = onSuccess(afterThis, doThat, 'a')

    expect(result).to.eql('b')

    expect(spy1.calls.length).to.eql(1)
    expect(spy1.calls[0]).to.eql([ 'a' ])

    expect(spy2.calls.length).to.eql(1)
    expect(spy2.calls[0]).to.eql([ 'a' ])
  })

  it('is auto-curried', () => {
    const afterThis = a => {
      spy1(a)
      return 'b'
    }

    const doThat = a => {
      spy2(a)
      return 'c'
    }

    const test = onSuccess(afterThis, doThat)

    const result = test('a')

    expect(result).to.eql('b')

    expect(spy1.calls.length).to.eql(1)
    expect(spy1.calls[0]).to.eql([ 'a' ])

    expect(spy2.calls.length).to.eql(1)
    expect(spy2.calls[0]).to.eql([ 'a' ])
  })

  it('does not execute second function when first fails', () => {
    const error = new Error('b')

    const afterThis = a => {
      spy1(a)
      throw error
    }

    const doThat = a => {
      spy2(a)
      return 'c'
    }

    try {
      onSuccess(afterThis, doThat, 'a')
      throw new Error('Unexpected success')
    } catch (e) {
      expect(e).to.eql(error)

      expect(spy1.calls.length).to.eql(1)
      expect(spy1.calls[0]).to.eql([ 'a' ])

      expect(spy2.calls.length).to.eql(0)
    }
  })
})
