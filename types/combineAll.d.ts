import type { Combined } from './lib/combine'

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
  R5 extends Record<PropertyKey, any>,
  R6 extends Record<PropertyKey, any>,
  R7 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
    f3: (x: TIn) => R3,
    f4: (x: TIn) => R4,
    f5: (x: TIn) => R5,
    f6: (x: TIn) => R6,
    f7: (x: TIn) => R7,
  ],
): { 
  (x: TIn): Combined<[ R1, R2, R3, R4, R5, R6, R7, TIn ]>
}

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
  R5 extends Record<PropertyKey, any>,
  R6 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
    f3: (x: TIn) => R3,
    f4: (x: TIn) => R4,
    f5: (x: TIn) => R5,
    f6: (x: TIn) => R6,
  ],
): { 
  (x: TIn): Combined<[ R1, R2, R3, R4, R5, R6, TIn ]>
}

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
  R5 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
    f3: (x: TIn) => R3,
    f4: (x: TIn) => R4,
    f5: (x: TIn) => R5,
  ],
): { 
  (x: TIn): Combined<[ R1, R2, R3, R4, R5, TIn ]>
}

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
    f3: (x: TIn) => R3,
    f4: (x: TIn) => R4,
  ],
  x: TIn,
): Combined<[ R1, R2, R3, R4, TIn ]>

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
    f3: (x: TIn) => R3,
  ],
): { 
  (x: TIn): Combined<[ R1, R2, R3, TIn ]>
}

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
    f2: (x: TIn) => R2,
  ],
): { 
  (x: TIn): Combined<[ R1, R2, TIn ]>
}

export default function combineAll<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => R1,
  ],
): { 
  (x: TIn): Combined<[ R1, TIn ]>
}

export default function combineAll<TIn extends Record<PropertyKey, any>>(
  fns: readonly [],
): { 
  (x: TIn): TIn
}
