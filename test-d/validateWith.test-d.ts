import { expectType } from 'tsd'
import Joi from '@hapi/joi'
import R from 'ramda'

import { validateWith } from '..'

const withNYC = (joi: Joi.Root) =>
  joi.extend({
    base: joi.string(),
    type: 'nyc',
  })

const withUSA = (joi: Joi.Root) =>
  joi.extend({
    base: joi.string(),
    type: 'usa',
  })

const extensions =
  R.compose(withNYC, withUSA)

const JoiExtended =
  extensions(Joi)

const schemaExtended = JoiExtended.object({
  foo: JoiExtended.string().nyc().usa().required()
})

const goodExtended = { foo: 'NYC, USA' }
const badExtended  = { foo: 'BLAH, USA' }

expectType<Promise<typeof goodExtended>>(validateWith(JoiExtended, schemaExtended, goodExtended))
expectType<Promise<typeof badExtended>>(validateWith(JoiExtended, schemaExtended, badExtended))
