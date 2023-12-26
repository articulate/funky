export type Combined<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any> = {},
  R2 extends Record<PropertyKey, any> = {},
  R3 extends Record<PropertyKey, any> = {},
  R4 extends Record<PropertyKey, any> = {},
  R5 extends Record<PropertyKey, any> = {},
  R6 extends Record<PropertyKey, any> = {},
  R7 extends Record<PropertyKey, any> = {},
> =
  & R7
  & Omit<R6, keyof R7>
  & Omit<R5, keyof R7 | keyof R6>
  & Omit<R4, keyof R7 | keyof R6 | keyof R5>
  & Omit<R3, keyof R7 | keyof R6 | keyof R5 | keyof R4>
  & Omit<R2, keyof R7 | keyof R6 | keyof R5 | keyof R4 | keyof R3>
  & Omit<R1, keyof R7 | keyof R6 | keyof R5 | keyof R4 | keyof R3 | keyof R2>
  & Omit<TIn, keyof R7 | keyof R6 | keyof R5 | keyof R4 | keyof R3 | keyof R2 | keyof R1>
