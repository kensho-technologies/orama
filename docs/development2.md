# Development

## File Structure

```
/src ┬ /components ─ /ComponentName ┬ index.js
     │                              ├ index.test.js
     │                              ├ methods.js
     │                              └ methods.test.js
     └ /utils ────── /utilName ─────┬ index.js
                                    ├ index.test.js    
```

Tests are colocated with the files they are testing. There's no CSS files, styles are inlined inside of the components.

## Functional Components

The main unit of development are Functional React Components. The components and the functions around it should not have side effects nor hold state, with exception of special leaf components that need to access and mutate the DOM directly. All props received by components is to be considered immutable, no function should mutate its input.

The component function receives a props input, which should not be deconstructed because of how the events callbacks are defined.

The props should not have a deep hierarchical structure, arrays of objects or objects with arrays should be the deepest structure used on any component. Functions should be used only on 'onUpdate' props and on elements who directly answer to browser events.

The propTypes should be defined for all props used on the component and on its events callbacks. If a prop is required to render the component a default prop needs to be defined, if a default cannot be provided for the component 'isRequired' should be specified.

Components get the variables for their style from a 'theme' prop, when one is not passed it uses the defaultTheme defined on the /components folder.

Example:
```jsx
import React, {PropTypes} from 'react'
import {Block} from '@luiscarli/display'
import defaultTheme from '../defaultTheme'

const ExampleComponent = props => (
  <Block
    fontFamily: {props.theme.font}
  >
    {props.text}
  </Block>
)

ExampleComponent.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.object,
}
ExampleComponent.defaultProps = {
  theme: defaultTheme,
}

export default ExampleComponent
```

## Data Flow (onUpdate)

Functional components map the data they receive to UI elements. Components are broken into sub components for managing complexity, readability and reusability; each component should be focused into solving the relation between the properties they receive and the components and elements they return.

The data for the application is hold by the top level component, only transient state should be hold by other components of the application, when the data changes on the top level component data flows down and the components are re-rendered accordingly.

Callbacks from interactions on components leads to change in the data, which is hold by the top level component. This flow is solved here on a **component level**, each component needs to handle both the mapping from his props to the children it renders as also the update of his own props according to the update of the props of his children.

When its children update their props by calling their 'onUpdate' method, the component should call his own 'onUpdate' method sending up his set of updated props (data should never be mutated, always return new variables when you need to transform data). The 'onUpdate' function is always called with an object containing all props from the child.

Example:
```jsx
import React, {PropTypes} from 'react'
import {Block} from '@luiscarli/display'
import defaultTheme from '../defaultTheme'

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
      theme={props.theme}
      onUpdate={handleAnnotationUpdate.bind(null, props)}
    />
  </Block>
)

ExampleComponent.propTypes = {
  onUpdate: PropTypes.func,
  text: PropTypes.string.isRequired,
  theme: PropTypes.object,
}
ExampleComponent.defaultProps = {
  theme: defaultTheme,
}

export default ExampleComponent
```

(testing)
(React batch)?
