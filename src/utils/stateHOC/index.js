/* eslint react/no-multi-comp:0 react/prop-types:0*/

import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import isStatelessComponentFunction from '../isStatelessComponentFunction'

/**
 * Funtion for wrapping 'stateless functional components' during development, allowing then to respond to onUpdate without changes to parent components.
 *
 * @example
 * import React, {PropTypes} from 'react'
 * import {Block} from '@luiscarli/display'
 * import Annotation from '../Annotation'
 *
 * export const handleAnnotationUpdate = (props, annotationProps) => {
 *   props.onUpdate({
 *     ...props,
 *     text: annotationProps.text,
 *   })
 * }
 *
 * const ExampleComponent = props => (
 *   <Block>
 *     <Annotation
 *       text={props.text}
 *       onUpdate={handleAnnotationUpdate.bind(null, props)}
 *     />
 *   </Block>
 * )
 *
 * ExampleComponent.propTypes = {
 *   onUpdate: PropTypes.func,
 *   text: PropTypes.string.isRequired,
 * }
 *
 * export default ExampleComponent
 */
const stateHOC = (Child, initialState = {}) => {
  if (isStatelessComponentFunction(Child)) {
    return React.createClass({
      displayName: `${Child.name}(state)`,
      propTypes: Child.propTypes,
      getDefaultProps() {
        return Child.defaultProps
      },
      getInitialState() {
        return initialState
      },
      componentWillReceiveProps() {
        this.setState(initialState)
      },
      shouldComponentUpdate: shouldPureComponentUpdate,
      handleChildUpdate(childProps) {
        this.setState(childProps)
      },
      render() {
        return Child({
          ...this.props,
          ...this.state,
          onUpdate: this.props.onUpdate || this.handleChildUpdate,
          onState: this.handleChildUpdate,
        })
      },
    })
  }

  return React.createClass({
    displayName: `${Child.displayName}(state)`,
    getDefaultProps() {
      return {}
    },
    getInitialState() {
      return initialState
    },
    componentWillReceiveProps() {
      this.setState(initialState)
    },
    shouldComponentUpdate: shouldPureComponentUpdate,
    handleChildUpdate(childProps) {
      this.setState(childProps)
    },
    render() {
      return (
        <Child
          {...this.props}
          {...this.state}
          onUpdate={this.props.onUpdate || this.handleChildUpdate}
        />
      )
    },
  })
}

export default stateHOC
