// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'
import * as React from 'react'

import isStatelessComponentFunction from './isStatelessComponentFunction'

function isFunction(functionToCheck) {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export function getName(name) {
  if (!name) return 'unknown'
  if (name[0] === '_') return name.substring(1)
  return name
}

export function getInitialState(initialState) {
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
 * export function handleAnnotationUpdate(props, annotationProps) {
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
export default function stateHOC(Child, initialState = {}) {
  if (isStatelessComponentFunction(Child)) {
    return class StateHOC extends React.PureComponent {
      static displayName = `${getName(Child.name)}(state)`

      static propTypes = {
        onUpdate: PropTypes.func,
      }

      static defaultProps = Child.defaultProps

      state = {
        ...getInitialState(Child.initialState),
        ...getInitialState(initialState),
      }

      handleChildUpdate = childProps => {
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
  // eslint-disable-next-line react/no-multi-comp
  return class StateHOC extends React.PureComponent {
    static displayName = `${Child.displayName}(state)`

    static propTypes = {
      onUpdate: PropTypes.func,
    }

    static defaultProps = {}

    state = {
      ...getInitialState(Child.initialState),
      ...getInitialState(initialState),
    }

    handleChildUpdate = childProps => {
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
