interface BatchOptions {
  limit?: number
  wait?: number
}

interface BatchMatchingOptions<
  TInputKey extends PropertyKey,
  TOuputKey extends PropertyKey,
  TIn extends Record<TInputKey, any>,
  TOut extends Record<TOuputKey, any>,
> extends BatchOptions {
  inputKey: (arg: TIn) => TInputKey
  outputKey: (arg: TOut) => TOuputKey,
}

type Batcher<TIn, TOut> = (arg: TIn[]) => Promise<TOut[]>
type Batched<TIn, TOut> = (arg: TIn) => Promise<TOut>

export default function batch<TIn, TOut>(
  opts: BatchOptions | undefined,
  f: Batcher<TIn, TOut>,
): Batched<TIn, TOut>

export default function batch<
  TInputKey extends PropertyKey,
  TOuputKey extends PropertyKey,
  TIn extends Record<TInputKey, any>,
  TOut extends Record<TOuputKey, any>,
>(
  opts: BatchMatchingOptions<TInputKey, TOuputKey, TIn, TOut>,
  f: Batcher<TIn, TOut>,
): Batched<TIn, TOut>

export default function batch(opts?: BatchOptions): {
  <TIn, TOut>(f: Batcher<TIn, TOut>): Batched<TIn, TOut>
}

export default function batch<
  TInputKey extends PropertyKey,
  TOuputKey extends PropertyKey,
  TIn extends Record<TInputKey, any>,
  TOut extends Record<TOuputKey, any>,
>(opts: BatchMatchingOptions<TInputKey, TOuputKey, TIn, TOut>): {
  (f: Batcher<TIn, TOut>): Batched<TIn, TOut>
}
