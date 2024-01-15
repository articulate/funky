import { expectType } from 'tsd'

import { renameAll } from '..'

const orig = {
  color: 'red' as const,
  name: 'bird' as const,
  sounds: {
    call: 'chirp' as const
  }
}

const renames = {
  color: 'appearance',
  count: 'number',
  sounds: {
    call: 'say'
  }
} as const

type Expectation = {
  appearance: 'red',
  name: 'bird',
  sounds: {
    say: 'chirp'
  }
}

expectType<Expectation>(renameAll(renames, orig))
expectType<Expectation>(renameAll(renames)(orig))
expectType<typeof orig>(renameAll({}, orig))
