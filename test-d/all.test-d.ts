import { expectType } from 'tsd'
import { all } from '..'

expectType<Promise<[ number, number ]>>(
  all([ Promise.resolve(1), Promise.resolve(2) ])
)
