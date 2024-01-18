type Assocer<TObj extends Record<PropertyKey, any>, TValue> =
  (obj: TObj) => TValue

type Assoced<
  TKey extends PropertyKey,
  TObj extends Record<PropertyKey, any>,
  TValue,
> = Omit<TObj, TKey> & Record<TKey, TValue>

export default function assocWith<
  TKey extends PropertyKey,
  TValue,
  TObj extends Record<PropertyKey, any>,
>(
  key: TKey,
  setter: Assocer<TObj, TValue>,
  obj: TObj,
): Assoced<TKey, TObj, TValue>

export default function assocWith<
  TKey extends PropertyKey,
  TObj extends Record<PropertyKey, any>,
  TValue,
>(key: TKey, setter: Assocer<TObj, TValue>): {
  (obj: TObj): Assoced<TKey, TObj, TValue>
}

export default function assocWith<TKey extends PropertyKey>(key: TKey): {
  <
    TObj extends Record<PropertyKey, any>,
    TValue,
  >(setter: Assocer<TObj, TValue>, obj: TObj): Assoced<TKey, TObj, TValue>

  <
    TObj extends Record<PropertyKey, any>,
    TValue,
  >(setter: Assocer<TObj, TValue>): {
    (obj: TObj): Assoced<TKey, TObj, TValue>
  }
}
