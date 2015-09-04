
import React, {PropTypes} from 'react'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    div: {
      fontFamily: 'verdana',
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
