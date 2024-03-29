import { Simplify } from 'type-fest'

import { RenameMap, RenamedKey } from './lib/rename'

type RenameAll<
  TRenameMap extends RenameMap,
  TVal extends Record<PropertyKey, any>,
> = Simplify<{
  [K in keyof TVal as RenamedKey<K, TRenameMap>]: K extends keyof TRenameMap
    ? TRenameMap[K] extends RenameMap
      ? RenameAll<TRenameMap[K], TVal[K]>
      : TRenameMap[K] extends PropertyKey
        ? TVal[K]
        : never
    : TVal[K]
}>


export default function renameAll<
  const TRenameMap extends RenameMap,
  TVal extends Record<PropertyKey, any>,
>(renames: TRenameMap, obj: TVal): RenameAll<TRenameMap, TVal>

export default function renameAll<
  const TRenameMap extends RenameMap,
>(renames: TRenameMap): {
  <TVal extends Record<PropertyKey, any>>(val: TVal): RenameAll<TRenameMap, TVal>
}
