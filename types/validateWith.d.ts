import { Schema } from '@hapi/joi'

export default function validateWith<T>(
  joi: any, // `joi.extend` returns `any`, so we're stuck accepting `any`
  schema: Schema,
  val: T,
): Promise<T>

export default function validateWith(joi: any, schema: Schema): {
  <T>(val: T): Promise<T>
}

export default function validateWith(joi: any): {
  <T>(schema: Schema, val: T): Promise<T>

  (schema: Schema): {
    <T>(val: T): Promise<T>
  }
}
