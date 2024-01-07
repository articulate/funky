type Callback<T> = (err: unknown, val?: T | null) => unknown

export default function promisify<
  TArgs extends any[],
  TResult,
  TThis,
>(
  f: (...args: [ ...TArgs, cb: Callback<TResult> ]) => unknown,
  ctx?: TThis,
): {
  (...args: TArgs): Promise<TResult>
}
