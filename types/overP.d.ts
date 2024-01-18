import { Lens } from 'ramda'

export default function overP<S, A>(
  lens: Lens<S, A>,
  fn: (arg: A) => Promise<A> | A,
  value: S,
): Promise<S>

export default function overP<S, A>(
  lens: Lens<S, A>,
  fn: (arg: A) => Promise<A> | A,
): (value: S) => Promise<S>

export default function overP<S, A>(
  lens: Lens<S, A>,
): (fn: (arg: A) => Promise<A> | A, value: S) => Promise<S>
