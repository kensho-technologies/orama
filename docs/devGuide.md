## Development Guide

Development needs node >= 5 and npm >= 3.  
```bash
# check the versions
$ node -v && npm -v
# update if necessary
# use nvm to help you manage node versions https://github.com/creationix/nvm
$ nvm i 5
$ npm i npm -g
```

After cloning the repo, install the packages dependencies
```bash
$ npm i
```

**Scripts**
```bash
$ npm start
# update node_modules dependencies if necessary,
# start a hot reload development server on http://localhost:3000/
# run unit tests and lint on source change

$ npm test
# executes unit tests and lint files

$ npm run bates -- cov
# generate coverage information from tests
# open coverage report on the browser
```
Scripts are handled by [Bates](https://github.com/luiscarli/bates), you can see all the possible options over there

## Style guide

On the Orama code base, we use an extended version of the Airbnb js style guide plus some extra conventions. The syntax rules are enforced by our linter, the conventions that are not linter enforced are presented bellow.

### Commit messages

Commit messages should have the following structure:
```
(TYPE) mainAffectedFile: action taken
```
Example of commits:
```
text: clean function return
(FIX) guides: lineWidth was not rendering
(FTR) basicRender: add clip config option
(BRK) Chart: stop rendering root as a layer
```
Type can be:
- `empty` for chores, docs, tests, refactors without noticeable speed improvements, typos, etc.
- `FIX` for bugs, fixes, performance, etc (patch semver -> 0.0.x).
- `FTR` for new features and functionality (minor semver -> 0.x.0).
- `BRK` for breaking changes, which will need updates to dependents of the code (major semver -> x.0.0).

When type is not empty, the commits should also contain a description of the change, the message and description will go directly to the release logs.

Each commit on a pull request should be meaningful and follow this convention.  
([Squash and edit commits as needed to achieve this](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages))
```
// BAD
d92d3953 wip refactor text return
2fbcd415 fix linter and style as requested

// GOOD
d92d3953 text: clean function return
```

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

### Only named exports

For consistency, use only named exports (no default exports).

```jsx
// BAD
export default function() {...}

// GOOD
export const calculateMethod = input => output
```

### Only arrow function expressions

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

### Stateless functional components

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

### Inline styles and theme handle

- Only inline style
- Use [`react-display`](https://github.com/luiscarli/react-display) components whenever possible

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

onUpdate calls should return the updated props from the component, plus any other info.

Example:
```jsx
export const handleAnnotationUpdate = (props, annotationProps) => {
  props.onUpdate({
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

All tests are colocated with the files they are testing, following the file structure of the repo.

- Focus first on doing code coverage.
- Components tests are done using shallow render.

Function test example:
```jsx
import {it as test} from 'mocha'
import assert from 'assert'

import {getScaleKeyByHash} from './'

test('Chart.getScaleKeyByHash', () => {
  assert.deepEqual(
    getScaleKeyByHash({}, 'x0'),
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
