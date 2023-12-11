// import type { F } from 'ts-toolbelt'
import type { UnionToIntersection } from 'type-fest'

type Transforms = any[] | Record<PropertyKey, any>

type TransformArgs<T> =
  T extends (...args: any[]) => any
    ? Parameters<T>
    : T extends []
      ? never
      : T extends readonly [infer I, ...infer R]
        ? TransformArgs<I> | TransformArgs<R>
        : T extends any[]
          ? { [K in keyof T]: TransformArgs<T[K]> }[number]
          : T extends Record<PropertyKey, any>
            ? { [K in keyof T]: TransformArgs<T[K]> }[keyof T]
            : never

type AssembleArgs<T extends Transforms> =
  [ TransformArgs<T> ] extends [ never ]
    ? unknown[]
    : UnionToIntersection<TransformArgs<T>>

type Assembled<T> =
  T extends (...args: any[]) => any
    ? ReturnType<T>
    : T extends []
      ? []
      : T extends readonly [infer I, ...infer R]
        ? [ Assembled<I>, ...Assembled<R> ]
        : T extends any[]
          ? { -readonly [K in keyof T]: Assembled<T[K]> }
          : T extends Record<PropertyKey, any>
            ? { -readonly [K in keyof T]: Assembled<T[K]> }
            : T

export default function assemble
  <const T extends Transforms>(
    xfrms: T, ...args: AssembleArgs<T>,
  ): Assembled<T>

// export default function assemble
//   <const T extends Transforms>(xfrms: T): F.Curry<(...args: AssembleArgs<T>) => Assembled<T>>

export default function assemble
  <const T extends Transforms>(xfrms: T): {
    (...args: AssembleArgs<T>): Assembled<T>
  }
