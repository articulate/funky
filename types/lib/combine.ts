import type { UnionToIntersection } from 'type-fest'

export type Combined<
  T extends Array<Record<PropertyKey, any>>,
  A extends Array<Record<PropertyKey, any>> = [],
  O extends PropertyKey = never
> =
  T extends []
    ? UnionToIntersection<A[number]>
    : T extends [ infer H, ...(infer R) ]
      ? H extends Record<PropertyKey, any>
        ? R extends Array<Record<PropertyKey, any>>
          ? Combined<R, [ ...A, Omit<H, O> ], keyof H | O>
          : never
        : never
      : never
