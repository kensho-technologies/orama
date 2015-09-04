
import React, {PropTypes} from 'react'
import R from 'ramda'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    tooltip: {
      background: styleVars.tooltip.background,
      color: styleVars.tooltip.color,
      fontFamily: styleVars.font,
      fontSize: styleVars.fontSize,
      margin: 13,
      maxWidth: 300,
      padding: 0,
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 900,
    },
    title: {
      fontSize: styleVars.tooltip.titleFontSize,
      fontWeight: 'bold',
      padding: 10,
      paddingBottom: 8,
    },
    table: {
      borderSpacing: 0,
    },
    tr1: {
      background: styleVars.tooltip.listBackground,
    },
    tr2: {
      background: styleVars.tooltip.listEvenBackground,
    },
    td: {
      borderSpacing: 0,
      padding: 10,
      textAlign: 'left',
      verticalAlign: 'top',
    },
    tdValue: {
      borderSpacing: 0,
      fontFamily: styleVars.fontMono,
      padding: 10,
      textAlign: 'right',
      verticalAlign: 'top',
    },
  }
}

export function getWindow() {
  if (global.window) return global.window
  return {
    innerWidth: 0,
    innerHeight: 0,
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
    const {hoverData} = this.props
    if (!hoverData) return null
    const styles = getStyles(this.props.styleVars)
    const containerStyle = {
      ...styles.tooltip,
      left: this.props.mouse.x,
      top: this.props.mouse.y,
    }
    const trElements = R.addIndex(R.map)((d, i) => {
      if (!d.prop) return undefined
      const trStyle = i % 2 ? styles.tr2 : styles.tr1
      return (
        <tr
          key={i}
          style={trStyle}
        >
          <td style={styles.td}>{d.alias || d.prop}</td>
          <td style={styles.tdValue}>{hoverData.raw[d.prop]}</td>
        </tr>
      )
    }, hoverData.tooltip || [])
    return (
      <div style={containerStyle}>
        {hoverData.label &&
          <div style={styles.title}>{hoverData.label}</div>
        }
        <table style={styles.table}>
          <tbody>
            {trElements}
          </tbody>
        </table>
      </div>
    )
  },
})
