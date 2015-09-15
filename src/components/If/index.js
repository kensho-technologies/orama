
import React, {PropTypes} from 'react'

/**
 * This component renders or not according to the `condition` prop.
 * @example
 * // instead of
 * {condition &&
 *   <Component/>
 * }
 * // you can do
 * <If condition={condition}>
 *   <Component/>
 * </If>
 */
export default React.createClass({
  displayName: 'If',
  propTypes: {
    children: PropTypes.element,
    condition: PropTypes.any,
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    if (!this.props.condition) return null
    return (
      <div>
        {this.props.children}
      </div>
    )
  },
})
