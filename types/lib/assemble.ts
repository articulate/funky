import type { F } from 'ts-toolbelt'

import type { ZipArgs } from './arguments'

type CurriedParameters<T extends (...args: any[]) => any> = T extends F.Curry<
  infer F
>
  ? Parameters<F>
  : Parameters<T>

type XformArgs<T> = T extends (...args: any[]) => any
  ? CurriedParameters<T>
  : T extends []
  ? never
  : T extends [infer Head, ...infer Tail]
  ? XformArgs<Head> | XformArgs<Tail>
  : T extends any[]
  ? { [K in keyof T]: XformArgs<T[K]> }[number]
  : T extends Record<PropertyKey, any>
  ? { [K in keyof T]: XformArgs<T[K]> }[keyof T]
  : never

export type AssembleArgs<T> = ZipArgs<XformArgs<T>>
