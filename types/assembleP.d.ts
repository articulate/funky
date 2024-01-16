import type { F } from 'ts-toolbelt'

import type { AssembleArgs } from './lib/assemble'

type AssemblePResult<T> = T extends (...args: any[]) => any
  ? Awaited<ReturnType<T>>
  : T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [AssemblePResult<Head>, ...AssemblePResult<Tail>]
  : T extends any[]
  ? { [K in keyof T]: AssemblePResult<T[K]> }
  : T extends Record<PropertyKey, any>
  ? { [K in keyof T]: AssemblePResult<T[K]> }
  : T

export default function assembleP<T>(
  xfrms: T,
): F.Curry<(...args: AssembleArgs<T>) => AssemblePResult<T>>

export default function assembleP<T>(
  xfrms: T,
  ...args: AssembleArgs<T>
): Promise<AssemblePResult<T>>
