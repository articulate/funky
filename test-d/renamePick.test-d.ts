import { expectType } from 'tsd'

import { renamePick } from '..'

const orig = {
  color: 'red' as const,
  name: 'bird' as const,
  sounds: {
    call: 'chirp' as const
  }
}

const renames = {
  color: 'appearance' as const,
  count: 'number' as const,
  sounds: {
    call: 'say' as const
  }
}

type Expectation = {
  appearance: 'red',
  sounds: {
    say: 'chirp'
  }
}

expectType<Expectation>(renamePick(renames, orig))
expectType<Expectation>(renamePick(renames)(orig))
expectType<{}>(renamePick({}, orig))
