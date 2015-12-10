
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

export const If = props => {
  if (!props.condition) return <noscript/>
  if (React.Children.count(props.children) === 1) {
    return React.Children.only(props.children)
  }
  return (
    <div>
      {props.children}
    </div>
  )
}
If.propTypes = {
  children: PropTypes.element,
  condition: PropTypes.any,
}
If.defaultProps = {
}
