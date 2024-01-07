export type WithPath<P extends readonly PropertyKey[], A = any> =
  P extends []
    ? A
    : P extends [ ...infer I, infer L ]
      ? I extends readonly PropertyKey[]
        ? L extends PropertyKey
          ? WithPath<I, Record<L, A>>
          : never
        : never
      : never
