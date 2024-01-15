export default function move<T>(from: number, to: number, list: T[]): T[]

export default function move(from: number, to: number): {
  <T>(list: T[]): T[]
}

export default function move(from: number): {
  <T>(to: number, list: T[]): T[]
  (to: number): {
    <T>(list: T[]): T[]
  }
}
