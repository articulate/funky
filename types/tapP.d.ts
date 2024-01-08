export default function tapP<T>(fn: (arg: T) => any, arg: T): Promise<T>

export default function tapP<T>(fn: (arg: T) => any): {
  (arg: T): Promise<T>
}
