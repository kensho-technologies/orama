# Development guide

## Development

Development needs node >= 0.12 and npm >= 3.
To update npm do `$ npm i -g npm`

**Scripts**
```bash
$ npm start
# install dependencies,
# start a hot reload development server on http://localhost:3000/
# run unit tests and lint on source change

$ npm test
# executes unit tests and lint files

$ npm run cov
# generate coverage information from tests
# open coverage report on the browser

# For publishing
$ npm run build
$ npm version [prerelease/path/minor]
$ npm publish

# Read package.json to see all scripts
```

## Style guide

We use an extended version of the Airbnb js style guide plus some extra conventions on the Orama code base. The syntax rules are enforced by our linter, the conventions that are not linter enforced are presented bellow.

### File structure

The maximum depth inside of `/src` is two folders.
Tests are colocated with the files they are testing.

Those are the possible folder compositions of the code base:

```
/src/ComponentName/index.js
/src/ComponentName/index.test.js
/src/ComponentName/FunctionGroupName/index.js
/src/ComponentName/FunctionGroupName/index.test.js
/src/ComponentName/SubComponentName/index.js
/src/ComponentName/SubComponentName/index.test.js

/src/FunctionGroupName/index.js
/src/FunctionGroupName/index.test.js
/src/FunctionGroupName/FunctionSubGroupName/index.js
/src/FunctionGroupName/FunctionSubGroupName/index.test.js
```

The `/src/main.js` file is the entry point of the devServer bundle.
The `/src/index.js` file is the entry point of the package.

### No default exports

Use only named exports, for consistency.

```jsx
// BAD
export default function() {...}

// GOOD
export const calculateMethod = input => output
```

### Function declaration

Use only *arrow function expression*, with exception of functions declared for class components methods.

```jsx
// BAD
function methodName(input) {
  return output
}
map(data, function(d) { return d * 2})

// GOOD
const methodName = input => output
map(data, d => d * 2)

class HelloMessage extends React.Component {
  render() {
    return <div>Hello</div>
  }
}
```

### Functional approach

- Don't use classes
- Don't use objects with methods (OO)
- Don't use the `this` variable  
(The exception goes to specialized React class components discussed bellow.)

```jsx
// BAD
const myObj = {
  p1: 10,
  m1: function() { this.p1 ++ }
}
```

- Use stateless 'pure' functions defined on the root of each file
- Keep a small line count on functions (~15)

- Don't mutate data from functions input
- Don't write functions that mutate variables from the file scope

- Whenever possible use `const` instead of `var` and `let`

### Stateless Functional Components

- Whenever possible use stateless functional components  
(The exception goes to components that need DOM manipulation or caching that can't be solved with `componentShouldUpdate`)

- Don't deconstruct the `props` on the function expression.
- Always declare propTypes
- Declare defaultProps whenever the component can break with a undefined prop that is not set as required.

```jsx
// GOOD
export const handleBlockClick = (props, evt) => {
  ...
}
export const ExampleComponent = props => (
  <Block
    onClick={evt => handleBlockClick(props, evt)}
  >
    {props.text}
  </Block>
)
ExampleComponent.propTypes = {
  text: PropTypes.string,
}
```

### Style

- Only inline style
- Use `react-display` components whenever possible

```jsx
// BAD
export const Example = props => (
  <div
    style={{
      padding: 30
    }}
  />
)

// GOOD
export const Example = props => (
  <Block
    padding={30}
  />
)
```

- When theming is needed import the default theme
- Always repass the theme component

```jsx
// BAD
export const Example = props => (
  <Block
    backgroundColor='black'
  />
)

// GOOD
import {DEFAULT_THEME} from '../defaultTheme'
export const Example = props => (
  <Block
    backgroundColor={theme.backgroundFill}
  >
    <OtherComp
      theme={props.theme}
    />
  </Block>
)
```

### State management with `onUpdate`

State that is not transient should be held by the root component.
Orama bubbles up state update by using 'onUpdate' callbacks.

onUpdate calls should return the full updated props from the component.

Example:
```jsx
export const handleAnnotationUpdate = (props, annotationProps) => {
  props.onUpdate({
    ...props,
    text: annotationProps.text,
  })
}
const ExampleComponent = props => (
  <Block>
    <Annotation
      text={props.text}
      onUpdate={handleAnnotationUpdate.bind(null, props)}
    />
  </Block>
)
```

During dev:
```jsx
export const ExampleComponent = stateHOC(_ExampleComponent)
```

### Unit tests

- Focus first on doing code coverage.
- Components tests are done using shallow render.

Function test example:
```jsx
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart.getScaleKeyByHash', () => {
  assert.deepEqual(
    methods.getScaleKeyByHash({}, 'x0'),
    'x'
  )
})
```

Component test example:
```jsx
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {Chart} from './'

test('Chart', () => {
  const component = shallowRender(<Chart/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
```
