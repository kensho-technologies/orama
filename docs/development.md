# Development

## Components

Base unit of development are React components and utility functions for extracting functionality from the components.

Start with a base React component:

```jsx
import React, {PropType} from 'react'

export default React.createClass({
  displayName: 'Example',
  propTypes: {
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    return (
      <div>
      </div>
    )
  },
})
```

PropTypes need to be defined for all props used on `render()` or any other component lifecycle. If a prop is not required the component should be able to render without its input, if it can't, a default prop need to be added.

```jsx
propTypes: {
  text: PropType.string,
},
getDefaultProps() {
  return {
    text: '',
  }
},
render() {
  return (
    <div>
      {this.props.text.length}
    </div>
  )
},
```

### Testing Components

All components should be tested from the start, we test components using [React shallow renderer](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering). Test specs end with `-test.js` and are placed beside the component file.

**Example-test.js**
```jsx
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import Example from './Example'

test('Example', t => {
  var component = renderComponent(<Example/>)
  t.equal(component.type, 'div')
  t.end()
})
```

### Extracting and testing functions from Components

For testing focus first on code coverage, run all the parts of the code that don't rely on DOM specificities. Whenever possible extract functions from the component, make then pure, without side-effects and don't mutate input data, so chunks of the code are easier to test and understand.

Extracted functions can be directly exported and tested:

**Example.js**
```jsx
import React, {PropType} from 'react'
import R from 'ramda'

export function trimAndUppercaseText(text) {
  return R.upper(R.trim(text))
}

export default React.createClass({
  displayName: 'Example',
  propTypes: {
    text: PropType.string,
  },
  getDefaultProps() {
    return {
      text: '',
    }
  },
  render() {
    const upperCasedText = trimAndUppercaseText(this.props.text)
    return (
      <div>
        {upperCasedText}
      </div>
    )
  },
})
```

**Example-test.js**
```jsx
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import Example, * as ExampleUtils from './Example'

test('Example', t => {
  var component = renderComponent(<Example/>)
  t.equal(component.type, 'div')
  t.end()
})

test('Example, upperCasedText', t => {
  t.deepEqual(
    ExampleUtils.upperCasedText(' name'),
    'NAME'
  )
  t.end()
})
```

### Documenting Components

Components and functions should be documented by using jsdoc specs. The documentation is automatically extracted by using `npm run doc`

**Example.js**
```jsx
import React, {PropType} from 'react'
import R from 'ramda'

/**
 * Trim and update a string
 * @param  {string} text
 * @return {string}
 */
export function trimAndUppercaseText(text) {
  return R.upper(R.trim(text))
}

/**
 * Component used as an example
 */
export default React.createClass({
  displayName: 'Example',
  propTypes: {
    /**
     * Optional description of the input prop
     */
    text: PropType.string,
  },
  getDefaultProps() {
    return {
      text: '',
    }
  },
  render() {
    const upperCasedText = trimAndUppercaseText(this.props.text)
    return (
      <div>
        {upperCasedText}
      </div>
    )
  },
})
```

### State on Components

On new components, when they receive interaction or need to side load data, start by adding local state to then. From there move the owner of the state to parent components and act on the state by using callbacks. (TODO: add explanation about who should own the state across the visualization components in relation to if the data should be saved.)

## Utilities modules

Besides React components the second code unit are modules of functions (those modules should not export a default function). Again, all functions should be pure, without side-effects (dont't modify data on the parent closure) and don't mutate input parameters.

**rectUtils.js**
```jsx
export function marginInset(marginInput, rectInput) {
  return {
    x: rect.x + margin.left,
    y: rect.y + margin.top,
    width: rect.width - margin.left - margin.right,
    height: rect.height - margin.top - margin.bottom,
  }
}
```

### Testing Utilities Modules

**rectUtils-test.js**
```jsx
import test from 'tape'
import * as rectUtils from './rectUtils'

test('rectUtils.marginInset', t => {
  const rect = rectUtils.marginInset(
    {left: 10, top: 10},
    {width: 100, height: 100}
  )
  t.deepEqual(
    rect,
    {x: 10, y: 10, width: 90, height: 90}
  )
  t.end()
})
```

### Documenting Utilities Modules

To document functions modules we need define a `@namespace` with the module path from the `src/` folder, and use it with the `@memberOf`:

**rectUtils.js**
```jsx
/**
 * Module for manipulating `Rect` representations
 * @namespace  /utils/rectUtils
 */

 /**
  * Inset a `Rect | Size` by a margin
  * @memberOf  /utils/rectUtils
  *
  * @param  {Object} marginInput - {left: number, right: number, top: number, bottom: number}
  * @param  {Object} rectInput - {x: number, y: number, width: number, height: number}
  * @return {Object}
  */
export function marginInset(marginInput, rectInput) {
  return {
    x: rect.x + margin.left,
    y: rect.y + margin.top,
    width: rect.width - margin.left - margin.right,
    height: rect.height - margin.top - margin.bottom,
  }
}
```
