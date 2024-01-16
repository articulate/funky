import { ZipArgs } from './lib/arguments'

type JuxtPResult<
  TFns extends Array<(...args: any[]) => any>,
  A extends any[] = [],
> = TFns extends []
  ? A
  : TFns extends [ infer Head, ...(infer Tail) ]
    ? Head extends (...args: any[]) => infer Result
      ? Tail extends Array<(...args: any[]) => any>
        ? JuxtPResult<Tail, [ ...A, Awaited<Result> ]>
        : never
      : never
    : never

export default function juxtP<
  const TFns extends Array<(...args: any[]) => any>,
>(fns: TFns): {
  (...args: ZipArgs<Parameters<TFns[number]>>): Promise<JuxtPResult<TFns>>
}
