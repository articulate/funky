import { ZipArgs } from './lib/arguments'

type ConvergingFunctions<
  TConverging extends readonly any[],
  A extends ReadonlyArray<(...args: any[]) => any> = []
> = TConverging extends []
  ? A
  : TConverging extends [ infer H, ...(infer R) ]
    ? ConvergingFunctions<R, [ ...A, (...args: any[]) => Promise<H> | H ]>
    : never

type ConvergingArgs<
  TConverging extends readonly any[],
  TFns extends ConvergingFunctions<TConverging>,
> = ZipArgs<Parameters<TFns[number]>>

export default function convergeP<
  TConverging extends readonly any[],
  TOut,
  TFns extends ConvergingFunctions<TConverging>,
>(
  after: (...args: TConverging) => Promise<TOut> | TOut,
  fs: TFns,
): {
  (...args: ConvergingArgs<TConverging, TFns>): Promise<TOut>
}

export default function convergeP<
  TConverging extends readonly any[],
  TOut,
>(after: (...args: TConverging) => Promise<TOut> | TOut): {
  <TFns extends ConvergingFunctions<TConverging>>(fns: TFns): {
    (...args: ConvergingArgs<TConverging, TFns>): Promise<TOut>
  }
}
