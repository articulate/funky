import { expectAssignable } from 'tsd'

import { batch } from '..'

interface In { inputId: string }
interface Out { outputId: string }

async function asyncListFn(args: In[]): Promise<Out[]> {
  return [{ outputId: 'bar' }]
}

const batchedWoOptions = batch(undefined, asyncListFn)
expectAssignable<Promise<Out>>(batchedWoOptions({ inputId: 'foo' }))

const batchedWOptions = batch({ limit: 2, wait: 16 }, asyncListFn)
expectAssignable<Promise<Out>>(batchedWOptions({ inputId: 'bar' }))

const batchedWithMatching = batch({
  inputKey: (x: { inputId: string }) => x.inputId,
  outputKey: (x: { outputId: string }) => x.outputId,
}, asyncListFn)

expectAssignable<Promise<Out>>(batchedWithMatching({ inputId: 'bar' }))
