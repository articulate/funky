export type RenameMap = {
  [K: PropertyKey]: PropertyKey | RenameMap,
}

export type RenamedKey<
  K extends PropertyKey,
  TRenameMap extends RenameMap,
> = K extends keyof TRenameMap
  ? TRenameMap[K] extends PropertyKey 
    ? TRenameMap[K]
    : K
  : K
