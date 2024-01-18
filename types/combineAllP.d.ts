import type { Combined } from './lib/combine'

export default function combineAllP<
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
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
    f3: (x: TIn) => Promise<R3> | R3,
    f4: (x: TIn) => Promise<R4> | R4,
    f5: (x: TIn) => Promise<R5> | R5,
    f6: (x: TIn) => Promise<R6> | R6,
    f7: (x: TIn) => Promise<R7> | R7,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, R3, R4, R5, R6, R7, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
  R5 extends Record<PropertyKey, any>,
  R6 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
    f3: (x: TIn) => Promise<R3> | R3,
    f4: (x: TIn) => Promise<R4> | R4,
    f5: (x: TIn) => Promise<R5> | R5,
    f6: (x: TIn) => Promise<R6> | R6,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, R3, R4, R5, R6, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
  R5 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
    f3: (x: TIn) => Promise<R3> | R3,
    f4: (x: TIn) => Promise<R4> | R4,
    f5: (x: TIn) => Promise<R5> | R5,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, R3, R4, R5, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
  R4 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
    f3: (x: TIn) => Promise<R3> | R3,
    f4: (x: TIn) => Promise<R4> | R4,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, R3, R4, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
  R3 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
    f3: (x: TIn) => Promise<R3> | R3,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, R3, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
  R2 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
    f2: (x: TIn) => Promise<R2> | R2,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, R2, TIn ]>>
}

export default function combineAllP<
  TIn extends Record<PropertyKey, any>,
  R1 extends Record<PropertyKey, any>,
>(
  fns: readonly [
    f1: (x: TIn) => Promise<R1> | R1,
  ],
): { 
  (x: TIn): Promise<Combined<[ R1, TIn ]>>
}

export default function combineAllP<TIn extends Record<PropertyKey, any>>(
  fns: readonly [],
): { 
  (x: TIn): Promise<TIn>
}
