/* eslint react/no-multi-comp:0 */

import React from 'react'

const isReferentiallyTransparentFunctionComponent = Component => (
  Component &&
  typeof Component !== 'string' &&
  !(Component.prototype && Component.prototype.render) &&
  !Component.contextTypes
)

/**
 * Funtion for wrapping 'stateless functional components' during development, allowing then to respond to onUpdate without changes to parent components.
 *
 * @example
 * handleDataChange(props) => {
 * 	props.onUpdate({
 * 		...props,
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
  if (isReferentiallyTransparentFunctionComponent(Child)) {
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
      handleChildUpdate(childProps) {
        this.setState(childProps)
      },
      render() {
        return Child({
          ...this.props,
          ...this.state,
          onUpdate: this.handleChildUpdate,
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
    handleChildUpdate(childProps) {
      this.setState(childProps)
    },
    render() {
      return (
        <Child
          {...this.props}
          {...this.state}
          onUpdate={this.handleChildUpdate}
        />
      )
    },
  })
}

export default stateHOC
