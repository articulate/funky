interface BackoffOptions {
  base?: number
  tries?: number
  when?: (err: unknown) => boolean
}

export default function backoff<TFunc extends (...args: any[]) => any>(
  opts: BackoffOptions | undefined,
  f: TFunc,
): TFunc

export default function backoff(opts?: BackoffOptions): {
  <TFunc extends (...args: any[]) => any>(f: TFunc): TFunc
}
