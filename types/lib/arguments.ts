// https://stackoverflow.com/a/77715194/1590365

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

export type ZipArgs<T extends any[], A extends any[] = []> = Tail<T> extends never
  ? A
  : NonRest<T> extends never
  ? [...A, ...IntersectHead<T>[]]
  : ZipArgs<Tail<T>, [...A, IntersectHead<T>]>
