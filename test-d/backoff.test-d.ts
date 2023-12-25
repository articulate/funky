import { expectType } from 'tsd'

import { backoff } from '..'

async function f(a: 'foo', b: 'bar'): Promise<'baz'> {
  return 'baz'
}

expectType<typeof f>(backoff(undefined, f))
expectType<typeof f>(backoff()(f))
expectType<typeof f>(backoff({ base: 16, tries: 5 }, f))
expectType<typeof f>(backoff({ base: 16, tries: 5 })(f))
