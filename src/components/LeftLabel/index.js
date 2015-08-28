
import React, {PropTypes} from 'react'
import R from 'ramda'

import {getStyleVars} from '../../utils/styleVars'

const styleVars = getStyleVars()
const styles = {
  div: {
    position: 'absolute',
    textAlign: styleVars.axis.textAlign,
    fontSize: styleVars.axis.labelFontSize,
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transform: 'translate(-100%) rotate(-90deg)',
    transformOrigin: '100% 0',
  },
}

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'LeftLabel',
  propTypes: {
    plotRect: PropTypes.object.isRequired,
    text: PropTypes.string,
  },
  getDefaultProps() {
    return {
      text: '',
      plotRect: {x: 0, y: 0, width: 0, height: 0},
    }
  },
  render() {
    const {plotRect} = this.props
    const style = R.merge(
      styles.div,
      {
        top: plotRect.y,
        width: plotRect.height,
      }
    )
    return (
      <div style = {style}>
        {this.props.text}
      </div>
    )
  },
})
