import { Lens } from 'ramda'

export default function overP<T>(
  lens: Lens,
  fn: (arg: any) => any,
  value: T,
): Promise<T>

export default function overP<T>(
  lens: Lens,
  fn: (arg: any) => any,
  value: T[],
): Promise<T[]>

export default function overP(
  lens: Lens,
  fn: (arg: any) => any,
): <T>(value: T) => Promise<T>

export default function overP(
  lens: Lens,
  fn: (arg: any) => any,
): <T>(value: T[]) => Promise<T[]>

export default function overP(
  lens: Lens,
): <T>(fn: (arg: any) => any, value: T) => Promise<T>

export default function overP(
  lens: Lens,
): <T>(fn: (arg: any) => any, value: T[]) => Promise<T[]>
