import unlessP from './unlessP'

// whenP & unlessP share the same signature
type WhenP = typeof unlessP
declare const whenP: WhenP
export default whenP
