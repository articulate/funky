import { O } from 'ts-toolbelt'
import { Simplify } from 'type-fest'
import { WithPath, } from './lib/path'

type RenamedPath<
  TPath extends readonly PropertyKey[],
  TFrom extends PropertyKey,
  TTo extends PropertyKey,
  TVal extends Record<PropertyKey, any>
> = Simplify<
  & O.P.Omit<TVal, [ ...TPath, TFrom ]>
  & WithPath<[ ...TPath, TTo ], O.Path<TVal, [ ...TPath, TFrom ]>>
>

export default function renamePath<
  const TPath extends readonly PropertyKey[],
  const TFrom extends PropertyKey,
  const TTo extends PropertyKey,
  TVal extends Record<PropertyKey, any>,
>(path: [ ...TPath, TFrom ], to: TTo, obj: TVal): RenamedPath<TPath, TFrom, TTo, TVal>

export default function renamePath<
  const TPath extends readonly PropertyKey[],
  const TFrom extends PropertyKey,
  const TTo extends PropertyKey,
>(path: [ ...TPath, TFrom ], to: TTo): {
  <TVal extends Record<PropertyKey, any>>(val: TVal): RenamedPath<TPath, TFrom, TTo, TVal>
}

export default function renamePath<
  const TPath extends readonly PropertyKey[],
  const TFrom extends PropertyKey,
>(path: [ ...TPath, TFrom ]): {
  <
    const TTo extends PropertyKey,
    TVal extends Record<PropertyKey, any>,
  >(to: TTo, obj: TVal): RenamedPath<TPath, TFrom, TTo, TVal>

  <const TTo extends PropertyKey>(to: TTo): {
    <TVal extends Record<PropertyKey, any>>(obj: TVal): RenamedPath<TPath, TFrom, TTo, TVal>
  }
}
