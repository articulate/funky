import type { F } from 'ts-toolbelt'
import type { UnionToIntersection } from 'type-fest'
import type { Gt } from 'ts-arithmetic';

type Simplify<T> = T extends Record<string, any> ? { [K in keyof T]: T[K] } & {} : T;

type _FillArray<Length extends number, T extends unknown, Acc extends unknown[] = []> = Acc['length'] extends Length ? Acc : _FillArray<Length, T, [...Acc, T]>;
type FillArray<Length extends number, T extends unknown = unknown> = [Length] extends [never] ? [] : _FillArray<Length, T>;

type GetLongestTuple<T extends any[], U extends any[] = T> = 
    // Each "iteration" of nested distributivity filters out the shortest tuple, as its length will never be greater than the other tuples' lengths.
    (
        T extends T
        ? U extends U
        ? (
            Gt<T['length'], U['length']> extends 1
            ? T
            : never
        )
        : never
        : never
    ) extends infer next extends any[]
    ? (
        // `next` will be `never` if `T` contains only 1 union member, as a tuple's length cannot be strictly greater than its own length (i.e. X['length'] ≯ X['length']).
        [next] extends [never]
        ? T // if so, return `T` (there may be other ways to terminate the recursion other than relying on an utterly useless final call, but this seems to work).
        : GetLongestTuple<next> // otherwise continue.
    )
    : never;

type ZipTuples<Tuples extends any[]> = 
    FillArray<GetLongestTuple<Tuples>['length']> extends infer filledArray
    ? {
        [K in keyof filledArray]: Simplify<UnionToIntersection<Tuples extends Tuples ? K extends keyof Tuples ? Tuples[K] : never : never>>
    }
    : []

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
  TransformArgs<T> extends infer A
    ? [A] extends [never]
      ? unknown[]
      : A extends any[] ? ZipTuples<A> : never
    : never

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
