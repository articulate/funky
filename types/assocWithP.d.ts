type AssocerP<TObj extends Record<PropertyKey, any>, TValue> =
  (obj: TObj) => TValue | Promise<TValue>

type AssocedP<
  TKey extends PropertyKey,
  TObj extends Record<PropertyKey, any>,
  TValue,
> = Promise<Omit<TObj, TKey> & Record<TKey, TValue>>

export default function assocWithP<
  TKey extends PropertyKey,
  TValue,
  TObj extends Record<PropertyKey, any>,
>(
  key: TKey,
  setter: AssocerP<TObj, TValue>,
  obj: TObj,
): AssocedP<TKey, TObj, TValue>

export default function assocWithP<
  TKey extends PropertyKey,
  TObj extends Record<PropertyKey, any>,
  TValue,
>(key: TKey, setter: AssocerP<TObj, TValue>): {
  (obj: TObj): AssocedP<TKey, TObj, TValue>
}

export default function assocWithP<TKey extends PropertyKey>(key: TKey): {
  <
    TObj extends Record<PropertyKey, any>,
    TValue,
  >(setter: AssocerP<TObj, TValue>, obj: TObj): AssocedP<TKey, TObj, TValue>

  <
    TObj extends Record<PropertyKey, any>,
    TValue,
  >(setter: AssocerP<TObj, TValue>): {
    (obj: TObj): AssocedP<TKey, TObj, TValue>
  }
}
