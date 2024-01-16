import { F } from 'ts-toolbelt'

type UseWithFunctions<
  TConverging extends readonly any[],
  A extends ReadonlyArray<(...args: any[]) => any> = []
> = TConverging extends []
  ? A
  : TConverging extends [ infer H, ...(infer R) ]
    ? UseWithFunctions<R, [ ...A, (...args: any[]) => Promise<H> | H ]>
    : never

type UseWithArgs<
  TConverging extends readonly any[],
  TFns extends UseWithFunctions<TConverging>,
  A extends any[] = [],
> = TFns extends []
  ? A
  : TConverging extends [ any, ...(infer RC) ]
    ? TFns extends [ infer H, ...(infer R) ]
      ? R extends UseWithFunctions<RC>
        ? H extends (arg: any) => any
          ? UseWithArgs<RC, R, [ ...A, Parameters<H>[0] ]>
          : never
        : never
      : never
    : never

export default function useWithP<
  TConverging extends readonly any[],
  TOut,
  TFns extends UseWithFunctions<TConverging>,
>(
  after: (...args: TConverging) => Promise<TOut> | TOut,
  fns: TFns,
): F.Curry<(...args: UseWithArgs<TConverging, TFns>) => Promise<TOut>>

export default function useWithP<
  TConverging extends readonly any[],
  TOut,
>(after: (...args: TConverging) => Promise<TOut> | TOut): {
  <TFns extends UseWithFunctions<TConverging>>(fns: TFns): F.Curry<
    (...args: UseWithArgs<TConverging, TFns>) => Promise<TOut>
  >
}
