import { Primitive, Simplify } from 'type-fest'

type Evolved<
  TXfrms extends Record<PropertyKey, any>,
  TIn extends Record<PropertyKey, any>,
> = Simplify<{
  [K in keyof TIn]: K extends keyof TXfrms
  ? TXfrms[K] extends (arg: TIn[K]) => infer R
  ? Awaited<R>
  : TXfrms[K] extends (...args: any[]) => any
  ? never
  : TXfrms[K] extends Primitive
  ? TXfrms[K]
  : Evolved<TXfrms[K], TIn[K]>
  : TIn[K]
}>

export default function<
  TXfrms extends Record<PropertyKey, any>,
  TIn extends Record<PropertyKey, any>,
>(xfrms: TXfrms, val: TIn): Promise<Evolved<TXfrms, TIn>>

export default function<TXfrms extends Record<PropertyKey, any>>(xfrms: TXfrms): {
  <TIn extends Record<PropertyKey, any>>(val: TIn): Promise<Evolved<TXfrms, TIn>>
}
