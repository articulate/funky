import { Schema } from '@hapi/joi'

export default function validate<T>(schema: Schema, val: T): Promise<T>

export default function validate(schema: Schema): {
  <T>(val: T): Promise<T>
}
