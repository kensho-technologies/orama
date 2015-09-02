
import React, {PropTypes} from 'react'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    tooltip: {
      background: 'hsl(0, 0%, 45%)',
      color: 'hsl(0, 0%, 100%)',
      fontFamily: styleVars.fontFamily,
      margin: 13,
      maxWidth: 300,
      padding: '9px 10px',
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 900,
    },
  }
}

export default React.createClass({
  displayName: 'Tooltip',
  propTypes: {
    hoverData: PropTypes.object,
    mouse: PropTypes.object,
    styleVars: PropTypes.object,
  },
  getDefaultProps() {
    return {
      mouse: {},
    }
  },
  render() {
    if (!this.props.hoverData) return null
    const styles = getStyles(this.props.styleVars)
    const containerStyle = {
      ...styles.tooltip,
      left: this.props.mouse.x,
      top: this.props.mouse.y,
    }
    return (
      <div style={containerStyle}>
        {this.props.hoverData.label}
      </div>
    )
  },
})
