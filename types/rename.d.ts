import { Simplify } from 'type-fest'

type Renamed<
  TFrom extends PropertyKey,
  TTo extends PropertyKey,
  TVal,
> = Simplify<
  & Omit<TVal, TFrom>
  & Record<TTo, TFrom extends keyof TVal ? TVal[TFrom] : undefined>
>

export default function rename<
  TFrom extends PropertyKey,
  TTo extends PropertyKey,
  TVal,
>(from: TFrom, to: TTo, obj: TVal): Renamed<TFrom, TTo, TVal>


export default function rename<
  TFrom extends PropertyKey,
  TTo extends PropertyKey,
>(from: TFrom, to: TTo): {
  <TVal>(obj: TVal): Renamed<TFrom, TTo, TVal>
}

export default function rename<TFrom extends PropertyKey>(from: TFrom): {
  <
    TTo extends PropertyKey,
    TVal,
  >(to: TTo, obj: TVal): Renamed<TFrom, TTo, TVal>

  <TTo extends PropertyKey>(to: TTo): {
    <TVal>(obj: TVal): Renamed<TFrom, TTo, TVal>
  }
}
