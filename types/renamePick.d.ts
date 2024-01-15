import { Simplify } from 'type-fest'

import { RenameMap, RenamedKey } from './lib/rename'

type RenamePick<
  TRenameMap extends RenameMap,
  TVal extends Record<PropertyKey, any>,
> = Simplify<{
  [K in Extract<keyof TRenameMap, keyof TVal> as RenamedKey<K, TRenameMap>]: K extends keyof TRenameMap
    ? TRenameMap[K] extends RenameMap
      ? RenamePick<TRenameMap[K], TVal[K]>
      : TRenameMap[K] extends PropertyKey
        ? TVal[K]
        : never
    : TVal[K]
}>


export default function renamePick<
  const TRenameMap extends RenameMap,
  TVal extends Record<PropertyKey, any>,
>(renames: TRenameMap, obj: TVal): RenamePick<TRenameMap, TVal>

export default function renamePick<
  const TRenameMap extends RenameMap,
>(renames: TRenameMap): {
  <TVal extends Record<PropertyKey, any>>(val: TVal): RenamePick<TRenameMap, TVal>
}
