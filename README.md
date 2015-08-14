## Explorer
[![Build Status](https://travis-ci.org/kensho/explorer.svg)](https://travis-ci.org/luiscarli/explorer)

**Scripts**
```bash
$ npm start
# install missing dependecies,
# start a hot reload development server on http://localhost:3000/
# and execute unit tests on source change
$ npm run start:flow
# same as above, and also runs flow checks on source change

$ npm run check
# run lint and executes unit tests

$ npm run test:cov
# generate coverage information from tests
$ open coverage/index.html
# open coverage report

$ npm run build
# build /lib and /dist files
```

**Style**  
Focus on pure functions with no side effects.  
Extract, export and annotate pure functions for testing.  
Keep side effects on functions that handle interaction (dispatch call) and async action creators.

```js
/* @flow */

import React, { PropTypes } from 'react'

/**
 * This function adds two numbers.
 */
export function add(n1: number, n2: number): number {
  return n1 + n2
}

/**
 * General component description.
 */
export default React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.func,
  },
  render(): any {
    return (
      <div>
        The result was: {add(1, 2)}
      </div>
    )
  },
})
```

**Testing**  
Testing is done using tape(https://github.com/substack/tape).  
React components are tested using shallow render(https://facebook.github.io/react/docs/test-utils.html).

```js
/* @flow */

import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import App, * as AppUtils from './App'

test('App should exist and render', (t) => {
  t.ok(App)
  var component = renderComponent(<App/>)
  t.equal(component.type, 'div')
  t.end()
})

test('App.add', (t) => {
  t.ok(AppUtils.add)
  t.equal(AppUtils.add(1, 1), 2, 'App.add result')
  t.end()
})
```

**Lint**  
This repo follows Airbnb ES6 style guide (https://github.com/airbnb/javascript), which has additional trailing commas on the last array elements and object properties.  
The exception is that we don't use semicollons.
