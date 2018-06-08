# API

| Function | Signature |
| -------- | --------- |
| [`all`](#all) | `[Promise a] -> Promise [a]` |
| [`assemble`](#assemble) | `{ k: (v -> v) } -> v -> { k: v }` |
| [`assembleP`](#assemblep) | `{ k: (v -> Promise v) } -> v -> Promise { k: v }` |
| [`assocWith`](#assocwith) | `String -> ({ k: v } -> a) -> { k: v } -> { k: v }` |
| [`assocWithP`](#assocwithp) | `String -> ({ k: v } -> Promise a) -> { k: v } -> Promise { k: v }` |
| [`backoff`](#backoff) | `{ k: v } -> (a... -> Promise b) -> a... -> Promise b` |
| [`batch`](#batch) | `{ k: v } -> ([a] -> Promise [b]) -> a -> Promise b` |
| [`combine`](#combine) | `({ k: v } -> { k: v }) -> { k: v } -> { k: v }` |
| [`combineAll`](#combineall) | `[({ k: v }, ...) -> { k: v }] -> ({ k: v }, ...) -> { k: v }` |
| [`combineAllP`](#combineallp) | `[({ k: v }, ...) -> Promise { k: v }] -> ({ k: v }, ...) -> Promise { k: v }` |
| [`combineP`](#combinep) | `({ k: v } -> Promise { k: v }) -> { k: v } -> Promise { k: v }` |
| [`combineWith`](#combinewith) | `(c -> b -> d) (a -> b) -> c -> d` |
| [`combineWithP`](#combinewithp) | `(c -> b -> d) (a -> Promise b) -> Promise c -> Promise d` |
| [`convergeP`](#convergep) | `(b -> c -> Promise d) -> [(a -> Promise b), (a -> Promise c)] -> a -> Promise d` |
| [`copyProp`](#copyprop) | `String -> String -> { k: v } -> { k: v }` |
| [`evolveP`](#evolvep) | `{ k: (v -> Promise v) } -> { k: v } -> Promise { k: v }` |
| [`juxtP`](#juxtp) | `[a... -> Promise b] -> a... -> Promise [b]` |
| [`mapP`](#mapp) | `Functor f => (a -> Promise b) -> f a -> Promise f b` |
| [`move`](#move) | `Number -> Number -> [a] -> [a]` |
| [`normalizeBy`](#normalizeby) | `String -> [{ k: v }] -> { v: { k: v } }` |
| [`overP`](#overp) | `Lens s => (a -> Promise b) -> s a -> Promise s b` |
| [`promisify`](#promisify) | `((a..., b -> ()) -> (), c) -> a... -> Promise b` |
| [`reject`](#reject) | `a -> Promise Error` |
| [`rename`](#rename) | `String -> String -> { k: v } -> { k: v }` |
| [`renameAll`](#renameall) | `{ k: v } -> { k: v } -> { k: v }` |
| [`resolve`](#resolve) | `a -> Promise a` |
| [`tapP`](#tapp) | `(a -> Promise b) -> a -> Promise a` |
| [`useWithP`](#usewithp) | `(a -> b -> Promise c) -> [(d -> Promise a), (e -> Promise b)] -> (d -> e -> Promise c)` |
| [`validate`](#validate) | `Schema -> a -> Promise a` |

### all

`@articulate/funky/lib/all`

```haskell
all :: [Promise a] -> Promise [a]
```

Returns a single `Promise` that resolves when all of the promises in the list have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.  Just a bound version of [`Promise.all`](http://devdocs.io/javascript/global_objects/promise/all).

See also [`reject`](#reject), [`resolve`](#resolve).

```js
all([ Promise.resolve('a') ]) //=> Promise ['a']
```

### assemble

`@articulate/funky/lib/assemble`

```haskell
assemble :: { k: (v -> v) } -> v -> { k: v }
```

Creates a new object by recursively applying a nested map of transforms to an input value.  Primitive values on the transform map are treated as constant functions.

```js
assemble({ foo: add(1), bar: { baz: add(2) }, bat: 1 }, 1) //=> { foo: 2, bar: { baz: 3 }, bat: 1 }
```

### assembleP

`@articulate/funky/lib/assembleP`

```haskell
assembleP :: { k: (v -> Promise v) } -> v -> Promise { k: v }
```

Creates a new object by recursively applying a nested map of async transforms to an input value.  Primitive values on the transform map are treated as constant functions.  Waits until all transforms complete before resolving.

```js
assembleP({ courses: getCourses, profile: getProfile }, userId) //=> Promise { courses: [], profile: {} }
```

### assocWith

`@articulate/funky/lib/assocWith`

```haskell
assocWith :: String -> ({ k: v } -> a) -> { k: v } -> { k: v }
```

Accepts three (3) arguments: a property, a function and an object.  Sets the property on the object to the result of the function.

```js
assocWith('foo', always('bar'), {}) //=> { foo: 'bar' }
```

### assocWithP

`@articulate/funky/lib/assocWithP`

```haskell
assocWithP :: String -> ({ k: v } -> Promise a) -> { k: v } -> Promise { k: v }
```

Accepts three (3) arguments: a property, a promise-returning function and an object.  Sets the property on the object to the result of the function when it resolves.

```js
assocWithP('foo', always(Promise.resolve('bar'), {})) //=> Promise { foo: 'bar' }
```

### backoff

`@articulate/funky/lib/backoff`

```haskell
backoff :: { k: v } -> (a... -> Promise b) -> a... -> Promise b
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `base` | `Number` | `250` | base delay in ms |
| `tries` | `Number` | `10` | max number of tries |
| `when` | `a -> Boolean` | `R.T` | only backoff if this returns true |

Accepts an options object, and then wraps an async function with a [full jitter exponential backoff](https://www.awsarchitectureblog.com/2015/03/backoff.html) algorithm.  Useful for recovering from intermittent network failures.  Will retry for caught errors that pass the `when` predicate until the number of `tries` is reached.

```js
const { propEq } = require('ramda')

const fetchImage = data => { /* async, and might fail sometimes */ }

const opts = {
  base: 500,
  tries: 5,
  when: propEq('statusCode', 429)
}

backoff(opts, fetchImage)
//=> a new function that tries at most 5 times before rejecting if the error is `429 Too Many Requests`
```

### batch

`@articulate/funky/lib/batch`

```haskell
batch :: { k: v } -> ([a] -> Promise [b]) -> a -> Promise b
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `limit` | `Number` | `Infinity` | max length of each batch |
| `wait` | `Number` | `32` | max wait before throttling batches |

Accepts an options object, and then wraps a batched async function.  Returns a throttled, unary async function that batches the args of successive invocations and resolves each individual promise with the matching result.  Useful for cutting down IO by combining requests.

```js
const { batch, evolveP } = require('@articulate/funky')
const { composeP, prop } = require('ramda')

const createMedia = batch({ limit: 128 }, require('../data/createMedia'))

const asset = composeP(prop('id'), createMedia)

const convertMedia = evolveP({
  audio: asset,
  image: asset,
  video: asset
})
// will create new media records for each entry in the object by batching
// them in a single request, and then store the new ids on the result object
```

### combine

`@articulate/funky/lib/combine`

```haskell
combine :: ({ k: v } -> { k: v }) -> { k: v }
```

Accepts a function & an object. Merges the results of the function into the object.

```js
combine(always({ foo: 1 }), { foo: 2, bar: 3 }) //=> { foo: 1, baz: 3 }
```

### combineAll

`@articulate/funky/lib/combineAll`

```haskell
combineAll :: combineAll : [a... -> { k: v }] -> { k: v } -> { k: v }
```

Accepts a list of functions & an object. Merges the results of all the functions into the object left-to-right

```js
combineAll([ always({ foo: 1, bar: 2 }), always({ bar: 3 }) ], { foo: 4, baz: 5 }) //=> { foo: 1, bar: 3, baz: 5 }
```

### combineP

`@articulate/funky/lib/combineP`

```haskell
combineP :: ({ k: v } -> Promise { k: v }) -> Promise { k: v }
```

Async version of [`combine`](#combine)

Accepts an async function & an object. Merges the results of the function into the object.

```js
combineP(always(resolve({ foo: 1 })), { foo: 2, bar: 3 }) //=> Promise { foo: 1, baz: 3 }
```

### combineWith

`@articulate/funky/lib/combineWith`

```haskell
combineWith :: (c -> b -> d) (a -> b) -> c -> d
```

Accepts a merging function, a transformation function, and an value. Uses the merging function to merge the results of the transformation function into the value.

```js
combineWith(multiply, add(2), 3) //=> 15
combineWith(mergeDeepLeft, always({ foo: { bar: 1, bip: 2 } }), { foo: { bar: 3, baz: 4 } })
  //=> { foo: { bar: 3, baz: 4, bip: 2 } }
```

### combineWithP

`@articulate/funky/lib/combineWithP`

```haskell
combineWithP :: (c -> b -> d) (a -> Promise b) -> Promise c -> Promise d
```

Async version of [`combineWith`](#combinewith).

Accepts a merging function, an async transformation function, and an value. Uses the merging function to merge the results of the transformation function into the value.

```js
combineWith(multiply, compose(resolve, add(2)), 3) //=> Promise 15
combineWith(mergeDeepLeft, always(resolve({ foo: { bar: 1, bip: 2 } })), { foo: { bar: 3, baz: 4 } })
  //=> Promise { foo: { bar: 3, baz: 4, bip: 2 } }
```

### convergeP

`@articulate/funky/lib/convergeP`

```haskell
convergeP :: (b -> c -> Promise d) -> [(a -> Promise b), (a -> Promise c)] -> a -> Promise d
```

An async version of [`R.converge`](http://devdocs.io/ramda/index#converge) that accepts Promise-returning branching and converging functions.

Accepts a converging function and a list of branching async functions and returns a new async function. When invoked, this new function is applied to some arguments, and each branching function is applied to those same arguments. The resolved values of each branching function are passed as arguments to the converging function to produce the resolved value.

See also [`juxtP`](#juxtp).

```js
const getCourse = convergeP(assoc('course'), [ fetchByCourseId, identity ])

const addCourseLesson = composeP(addLesson, getCourse)
```

### copyProp

`@articulate/funky/lib/copyProp`

```haskell
copyProp :: String -> String -> { k: v } -> { k: v }
```

Quickly copy one property on an object to another key.

See also [`rename`](#rename).

```js
copyProp('id', 'courseId', { id: 'abc' }) //=> { id: 'abc', courseId: 'abc' }
```

### evolveP

`@articulate/funky/lib/evolveP`

```haskell
evolveP :: { k: (v -> Promise v) } -> { k: v } -> Promise { k: v }
```

An async version of [`R.evolve`](http://devdocs.io/ramda/index#evolve) that accepts Promise-returning transformation functions.

Creates a new object by recursively evolving a shallow copy of an object, according to the transformation functions. All non-primitive properties are copied by reference.  A transformation function will not be invoked if its corresponding key does not exist in the evolved object.

See also [`mapP`](#mapp).

```js
evolveP({ author: getProfile }, { author: 'abc' }) // Promise { author: { name: 'joey', ... } }
```

### juxtP

`@articulate/funky/lib/juxtP`

```haskell
juxtP :: [a... -> Promise b] -> a... -> Promise [b]
```

An async version of [`R.juxt`](http://devdocs.io/ramda/index#juxt) that accepts Promise-returning branching functions.

Applies a list of functions to some values, and resolves with a list of their resolved values.

See also [`convergeP`](#convergep).

```js
const deleteCourseAndLessons = juxtP([ deleteCourse, deleteLessons ])
```

### mapP

`@articulate/funky/lib/mapP`

```haskell
mapP :: (a -> Promise b) -> [a] -> Promise [b]
```

An async version of [`R.map`]() that accepts a Promise-returning function.

Takes an async function and a list, applies the function to each of the list's values, and resolves with a list of the resolved values.

See also [`evolveP`](#evolvep).

```js
mapP(getProfile, ['abc','def']) //=> Promise [{ name: 'joey' }, { name: 'fella' }]
```

### move

`@articulate/funky/lib/move`

```haskell
move :: Number -> Number -> [a] -> [a]
```

Moves a list item from one position to another.

```js
move(3, 1, ['a','b','c','d']) //=> ['a','d','b','c']
```

### normalizeBy

`@articulate/funky/lib/normalizeBy`

```haskell
normalizeBy :: String -> [{ k: v }] -> { v: { k: v } }
```

[Normalizes a list](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) by building an object, with the IDs of the list items as keys and the items themselves as the values.  List items will be normalized by the specified key, so make sure it is unique.

```js
normalizeBy('uid', [{ uid: 'abc' }, { uid: 'def' }]) //=> { abc: { uid: 'abc' }, def: { uid: 'def' }}
```


### overP

`@articulate/funky/lib/overP`

```haskell
overP :: Lens s -> (a -> Promise b) -> s a -> Promise s b
```

An async version of [`R.over`](http://ramdajs.com/docs/#over) that accepts a Promise-returning function.

Returns the result of "setting" the portion of the given data structure focused by the given lens to the result of applying the given async function to the focused value.

```js
const headLens = lensIndex(0)
const asyncToUpper = compose(resolve, toUpper)
overP(headLens, asyncToUpper, ['foo', 'bar', 'baz']) //=> Promise ['FOO', 'bar', 'baz']
```

### promisify

`@articulate/funky/lib/promisify`

```haskell
promisify :: ((a..., b -> ()) -> (), c) -> a... -> Promise b
```

Takes a function which accepts a node-style callback and returns a new function that returns a `Promise` instead.  Will also bind it to an optional context object.

```js
const upload = promisify(s3.upload, s3)
```

### reject

`@articulate/funky/lib/reject`

```haskell
reject :: a -> Promise Error
```

Returns a `Promise` object that is rejected with the given reason.  A bound version of [`Promise.reject`](http://devdocs.io/javascript/global_objects/promise/reject), but also wraps non-errors with `Error` for a consistent interface.

See also [`all`](#all), [`resolve`](#resolve).

```js
reject(new Error('bad guy')) //=> Promise Error('bad guy')
reject('bad guy')            //=> Promise Error('bad guy')
```

### rename

`@articulate/funky/lib/rename`

```haskell
rename :: String -> String -> { k: v } -> { k: v }
```

Easily rename a property on an object to be a different key.

See also [`copyProp`](#copyprop), [`renameAll`](#renameall).

```js
rename('id', 'courseId', { id: 'abc' }) //=> { courseId: 'abc' }
```

### renameAll

`@articulate/funky/lib/renameAll`

```haskell
renameAll :: { k: v } -> { k: v } -> { k: v }
```

Rename multiple properties on an object to have different keys.

```js
const orig = { first_name: 'Miles', last_name: 'Callisto' }
renameAll({ first_name: 'firstName', last_name: 'lastName' }, orig)
//=> { firstName: 'Miles', lastName: 'Callisto' }
```

### resolve

`@articulate/funky/lib/resolve`

```haskell
resolve :: a -> Promise a
```

Lifts a value into a `Promise`.  Just a bound version of [`Promise.resolve`](http://devdocs.io/javascript/global_objects/promise/resolve).

See also [`all`](#all), [`reject`](#reject).

```js
resolve('a') //=> Promise 'a'
```

### tapP

`@articulate/funky/lib/tapP`

```haskell
tapP :: (a -> Promise b) -> a -> Promise a
```

An async version of [`R.tap`](http://devdocs.io/ramda/index#tap) that accepts a Promise-returning function.

Runs the given function with the supplied value, and then resolves with that value.

```js
tapP(a => Promise.resolve('b'), 'a') //=> Promise 'a'
```

### useWithP

`@articulate/funky/lib/useWithP`

```haskell
useWithP :: (a -> b -> Promise c) -> [(d -> Promise a), (e -> Promise b)] -> (d -> e -> Promise c)
```

An async version of [`R.useWith`](https://ramdajs.com/docs/#useWith) that accepts Promise-returning transformer and original functions.

Accepts a function `fn` and a list of transformer functions and returns a new curried function. When the new function is invoked, it calls the function `fn` with parameters consisting of the result of calling each supplied handler on successive arguments to the new function.

See also [`convergeP`](#convergep)

```js
const getCourseAndAuthor = useWithP(pair, [ fetchCourseById, fetchAuthorById ])
getCourseAndAuthor('course-id', 'author-id') //=> Promise [ course, author ]
```

### validate

`@articulate/funky/lib/validate`

```haskell
validate :: Schema -> a -> Promise a
```

Validates a value against a [`Joi`](https://github.com/hapijs/joi) schema.  Curried and promisified for ease of use.

**Note:** For validation to work, requires [`Joi`](https://github.com/hapijs/joi) to be installed as a dependency of the consuming application.

```js
const schema = Joi.object({
  id: Joi.string().required()
})

validate(schema, { id: 'abc' }) //=> Promise { id: 'abc' }
validate(schema, { id: 123 })   //=> Promise ValidationError
```
