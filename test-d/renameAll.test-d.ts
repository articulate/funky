import { expectType } from 'tsd'

import { renameAll } from '..'

const orig = {
  color: 'red' as const,
  name: 'bird' as const,
  sounds: {
    call: 'chirp' as const
  },
  title: 'My title' as const,
  latestTitle: 'haha (business)' as const,
}

const renames = {
  color: 'appearance',
  count: 'number',
  sounds: {
    call: 'say'
  },
  latestTitle: 'title',
  title: 'updatedTitle',
} as const

type Expectation = {
  appearance: 'red',
  name: 'bird',
  sounds: {
    say: 'chirp'
  },
  title: 'haha (business)',
  updatedTitle: 'My title',
}

expectType<Expectation>(renameAll(renames, orig))
expectType<Expectation>(renameAll(renames)(orig))
expectType<typeof orig>(renameAll({}, orig))
