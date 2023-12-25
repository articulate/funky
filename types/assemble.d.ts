import type { F } from 'ts-toolbelt'

type IntersectHead<T extends any[]> = (
  T extends [infer F, ...any]
    ? (x: F) => void
    : T extends []
    ? never
    : (x: T[0]) => void
) extends infer J
  ? [J] extends [never]
    ? never
    : [J] extends [(x: infer V) => void]
    ? V
    : never
  : never

type Tail<T extends any[]> = T extends [any, ...infer R]
  ? R
  : T extends []
  ? never
  : T

type NonRest<T extends any[]> = T extends [any, ...any]
  ? unknown
  : T extends []
  ? unknown
  : never

type ZipArgs<T extends any[], A extends any[] = []> = Tail<T> extends never
  ? A
  : NonRest<T> extends never
  ? [...A, ...IntersectHead<T>[]]
  : ZipArgs<Tail<T>, [...A, IntersectHead<T>]>

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

type AssembleArgs<T> = ZipArgs<XformArgs<T>>

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

export default function assemble<T>(
  xfrms: T,
): F.Curry<(...args: AssembleArgs<T>) => AssembleResult<T>>

export default function assemble<T>(
  xfrms: T,
  ...args: AssembleArgs<T>
): AssembleResult<T>
