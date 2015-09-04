
import React, {PropTypes} from 'react'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    div: {
      bottom: 0,
      color: styleVars.axis.color,
      fontFamily: styleVars.font,
      fontSize: styleVars.axis.labelFontSize,
      overflow: 'hidden',
      position: 'absolute',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }
}

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'BottomLabel',
  propTypes: {
    plotRect: PropTypes.object.isRequired,
    styleVars: PropTypes.object,
    text: PropTypes.string,
  },
  getDefaultProps() {
    return {
      plotRect: {x: 0, y: 0, width: 0, height: 0},
      text: '',
    }
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    const {plotRect} = this.props
    const style = {
      ...styles.div,
      left: plotRect.x,
      width: plotRect.width,
    }
    return (
      <div style={style}>
        {this.props.text}
      </div>
    )
  },
})
