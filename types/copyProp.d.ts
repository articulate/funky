import { O } from 'ts-toolbelt'

type CopiedWithProp<
  From extends PropertyKey,
  To extends PropertyKey,
  T extends Record<PropertyKey, any>,
> = O.Merge<T, Record<To, T[From]>>

export default function copyProp<
  From extends PropertyKey,
  To extends PropertyKey,
  T extends Record<PropertyKey, any>,
>(from: From, to: To, obj: T): CopiedWithProp<From, To, T>

export default function copyProp<
  From extends PropertyKey,
  To extends PropertyKey,
>(from: From, to: To): {
  <T extends Record<PropertyKey, any>>(obj: T): CopiedWithProp<From, To, T>
}

export default function copyProp<From extends PropertyKey>(from: From): {
  <To extends PropertyKey, T extends Record<PropertyKey, any>>(
    to: To,
    obj: T,
  ): CopiedWithProp<From, To, T>

  <To extends PropertyKey>(to: To): {
    <T extends Record<PropertyKey, any>>(obj: T): CopiedWithProp<To, From, T>
  }
}
