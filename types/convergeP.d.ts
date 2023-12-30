type ConvergingFunctions<
  TIn extends any[],
  TConverging extends readonly any[],
  A extends ReadonlyArray<(...args: TIn) => any> = [],
> = TConverging extends []
  ? A
  : TConverging extends [infer H, ...(infer R)]
    ? ConvergingFunctions<TIn, R, [ ...A, (...args: TIn) => Promise<H> | H ]>
    : never

export default function convergeP<
  TConverging extends readonly any[],
  TOut,
  TIn extends any[],
>(
  after: (...args: TConverging) => Promise<TOut> | TOut,
  fs: ConvergingFunctions<TIn, TConverging>,
): {
  (...args: TIn): Promise<TOut>
}

export default function convergeP<
  TConverging extends readonly any[],
  TOut,
>(
  after: (...args: TConverging) => Promise<TOut> | TOut,
): {
  <TIn extends any[]>(fs: ConvergingFunctions<TIn, TConverging>): {
    (...args: TIn): Promise<TOut>
  }
}
