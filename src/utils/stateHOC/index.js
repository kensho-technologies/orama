// Copyright 2017 Kensho Technologies, LLC.

import * as React from 'react'
import isStatelessComponentFunction from '../isStatelessComponentFunction'

function isFunction(functionToCheck) {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}
export const getName = name => {
  if (!name) return 'unknown'
  if (name[0] === '_') return name.substring(1)
  return name
}
export const getInitialState = initialState => {
  if (isFunction(initialState)) return initialState()
  return initialState
}

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
    return class stateHOC extends React.PureComponent {
      static displayName = `${getName(Child.name)}(state)`
      static defaultProps = Child.defaultProps
      state = {
        ...getInitialState(Child.initialState),
        ...getInitialState(initialState),
      }
      handleChildUpdate = (childProps) => {
        this.setState(childProps)
      }
      render() {
        return Child({
          ...this.props,
          ...this.state,
          onUpdate: this.props.onUpdate || this.handleChildUpdate,
          onState: this.handleChildUpdate,
        })
      }
    }
  }
  return class stateHOC extends React.PureComponent {
    static displayName = `${Child.displayName}(state)`
    static defaultProps = {}
    state = {
      ...getInitialState(Child.initialState),
      ...getInitialState(initialState),
    }
    handleChildUpdate = (childProps) => {
      this.setState(childProps)
    }
    render() {
      return (
        <Child
          {...this.props}
          {...this.state}
          onUpdate={this.props.onUpdate || this.handleChildUpdate}
        />
      )
    }
  }
}

export default stateHOC
