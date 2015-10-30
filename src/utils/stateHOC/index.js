/* eslint react/no-multi-comp:0 react/prop-types:0*/

import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import isStatelessComponentFunction from '../isStatelessComponentFunction'

/**
 * Funtion for wrapping 'stateless functional components' during development, allowing then to respond to onUpdate without changes to parent components.
 *
 * @example
 * handleDataChange(props) => {
 * 	props.onUpdate({
 * 		data: getNewData(),
 * 	})
 * }
 *
 * const StatelessFunctionalComponent = props => (
 * 	<div onClick={handleDataChange.bind(null, props)}>
 * 		{props.data}
 * 	</div>
 * )
 *
 * export default stateHOC(StatelessFunctionalComponent)
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