import { expectType } from 'tsd'
import Joi from '@hapi/joi'

import { validate } from '..'

const schema = Joi.object({
  foo: Joi.string().required(),
})

const good  = { foo: 'bar' as const }
const bad   = { foo: 12345 as const }
const extra = { foo: 'bar' as const, bar: '123' as const }

expectType<Promise<typeof good>>(validate(schema, good))

// Joi makes no assertions, so even though this will reject
// at runtime, the resulting type is still Promise<T>
expectType<Promise<typeof bad>>(validate(schema, bad))
expectType<Promise<typeof extra>>(validate(schema, extra))
