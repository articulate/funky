import type { F } from 'ts-toolbelt'
import type { UnionToIntersection } from 'type-fest'
import type { Gt } from 'ts-arithmetic';

type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never
type Push<T extends any[], V> = [...T, V];
// TuplifyUnion and associated types courtesy of https://stackoverflow.com/a/55128956/20071103
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;

type _FillArray<Length extends number, T extends unknown, Acc extends unknown[] = []> = Acc['length'] extends Length ? Acc : _FillArray<Length, T, [...Acc, T]>;
type FillArray<Length extends number, T extends unknown = unknown> = [Length] extends [never] ? [] : _FillArray<Length, T>;

type _GetMaxPositiveNumber<Nums extends number[], CurrMax extends number = 0> =  Nums extends [infer First extends number, ...infer Rest extends number[]] ? _GetMaxPositiveNumber<Rest, Gt<First, CurrMax> extends 1 ? First : CurrMax> : CurrMax;
type GetMaxPositiveNumber<Nums extends number[]> = Nums extends [] ? never : _GetMaxPositiveNumber<Nums>;

type Simplify<T> = {
    [K in keyof T]: T[K]
} & {};


type ZipTuples<Tuples extends unknown[]> =
    TuplifyUnion<Tuples['length']> extends infer tuplifiedLengths extends number[]
    ? FillArray<GetMaxPositiveNumber<tuplifiedLengths>> extends infer filledArray
    ? {
        [K in keyof filledArray]:
        | (Tuples extends Tuples ? K extends keyof Tuples ? never : undefined : never)
        | Simplify<UnionToIntersection<Tuples extends Tuples ? K extends keyof Tuples ? Tuples[K] : never : never>>
    }
    : never
    : never;

type Transforms = any[] | Record<PropertyKey, any>

type TransformArgs<T> =
  T extends (...args: any[]) => any
    ? Parameters<T>
    : T extends []
      ? never
      : T extends readonly [infer I, ...infer R]
        ? TransformArgs<I> | TransformArgs<R>
        : T extends any[]
          ? { [K in keyof T]: TransformArgs<T[K]> }[number]
          : T extends Record<PropertyKey, any>
            ? { [K in keyof T]: TransformArgs<T[K]> }[keyof T]
            : never

type AssembleArgs<T extends Transforms> =
  [ TransformArgs<T> ] extends [ never ]
    ? unknown[]
    : ZipTuples<TransformArgs<T>>

type Assembled<T> =
  T extends (...args: any[]) => any
    ? ReturnType<T>
    : T extends []
      ? []
      : T extends readonly [infer I, ...infer R]
        ? [ Assembled<I>, ...Assembled<R> ]
        : T extends any[]
          ? { -readonly [K in keyof T]: Assembled<T[K]> }
          : T extends Record<PropertyKey, any>
            ? { -readonly [K in keyof T]: Assembled<T[K]> }
            : T

export default function assemble
  <const T extends Transforms>(
    xfrms: T, ...args: AssembleArgs<T>,
  ): Assembled<T>

export default function assemble
  <const T extends Transforms>(xfrms: T): F.Curry<(...args: AssembleArgs<T>) => Assembled<T>>
