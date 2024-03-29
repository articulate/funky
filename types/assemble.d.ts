import type { F } from 'ts-toolbelt'

import type { AssembleArgs } from './lib/assemble'

type AssembleResult<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [AssembleResult<Head>, ...AssembleResult<Tail>]
  : T extends any[]
  ? { [K in keyof T]: AssembleResult<T[K]> }
  : T extends Record<PropertyKey, any>
  ? { [K in keyof T]: AssembleResult<T[K]> }
  : T

type CurriedAssembleFunction<
  T,
  Fn extends (...args: AssembleArgs<T>) => AssembleResult<T>
> = F.Length<Fn> extends 0 ? Fn : F.Curry<Fn>

export default function assemble<T>(
  xfrms: T,
): CurriedAssembleFunction<T, (...args: AssembleArgs<T>) => AssembleResult<T>>

export default function assemble<T>(
  xfrms: T,
  ...args: AssembleArgs<T>
): AssembleResult<T>
