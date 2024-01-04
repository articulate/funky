import { O } from 'ts-toolbelt'
import { Simplify } from 'type-fest'

type WithPath<P extends readonly PropertyKey[], A = any> =
  P extends []
    ? A
    : P extends [ ...infer I, infer L ]
      ? I extends readonly PropertyKey[]
        ? L extends PropertyKey
          ? WithPath<I, Record<L, A>>
          : never
        : never
      : never
    
type CopiedWithPath<
  From extends readonly PropertyKey[],
  To extends readonly PropertyKey[],
  T extends Record<PropertyKey, any>,
> = Simplify<O.P.Omit<T, To> & WithPath<To, O.Path<T, From>>>

export default function copyPath<
  const From extends PropertyKey[],
  const To extends PropertyKey[],
  T extends Record<PropertyKey, any>,
>(from: From, to: To, obj: T): CopiedWithPath<From, To, T>

export default function copyPath<
  const From extends readonly PropertyKey[],
  const To extends readonly PropertyKey[],
>(from: From, to: To): {
  <T extends Record<PropertyKey, any>>(obj: T): CopiedWithPath<From, To, T>
}

export default function copyPath<const From extends readonly PropertyKey[]>(from: From): {
  <
    const To extends readonly PropertyKey[],
    T extends Record<PropertyKey, any>,
  >(to: To, obj: T): CopiedWithPath<From, To, T>
  
  <const To extends readonly PropertyKey[]>(to: To): {
    <T extends Record<PropertyKey, any>>(obj: T): CopiedWithPath<From, To, T>
  }
}
