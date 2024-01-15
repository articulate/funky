type MapperP<T, U> = (val: T) => Promise<U> | U

type MappedObject<O extends Record<PropertyKey, any>, U> = {
  [K in keyof O]: U
}

export default function mapP<T, U>(
  fn: MapperP<T, U>,
  arr: T[],
): Promise<U[]>

export default function mapP<T, U, O extends Record<PropertyKey, any>>(
  fn: MapperP<T, U>,
  obj: O,
): Promise<MappedObject<O, U>>

export default function mapP<T, U>(fn: MapperP<T, U>): {
  (arr: T[]): Promise<U[]>,
  <O extends Record<PropertyKey, any>>(obj: O): Promise<MappedObject<O, U>>
}
