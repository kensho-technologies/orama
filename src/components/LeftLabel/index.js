
import React, {PropTypes} from 'react'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
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
}

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'LeftLabel',
  propTypes: {
    plotRect: PropTypes.object.isRequired,
    styleVars: PropTypes.object,
    text: PropTypes.string,
  },
  getDefaultProps() {
    return {
      text: '',
      plotRect: {x: 0, y: 0, width: 0, height: 0},
    }
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    const {plotRect} = this.props
    const style = {
      ...styles.div,
      top: plotRect.y,
      width: plotRect.height,
    }
    return (
      <div style = {style}>
        {this.props.text}
      </div>
    )
  },
})
