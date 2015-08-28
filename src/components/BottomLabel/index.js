
import React, {PropTypes} from 'react'
import R from 'ramda'

import {getStyleVars} from '../../utils/styleVars'

const styleVars = getStyleVars()
const styles = {
  div: {
    bottom: 0,
    position: 'absolute',
    textAlign: styleVars.axis.textAlign,
    fontSize: styleVars.axis.labelFontSize,
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'BottomLabel',
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
        left: plotRect.x,
        width: plotRect.width,
      }
    )
    return (
      <div style = {style}>
        {this.props.text}
      </div>
    )
  },
})
