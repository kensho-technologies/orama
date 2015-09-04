
import React, {PropTypes} from 'react'
import R from 'ramda'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    tooltip: {
      background: 'hsl(0, 0%, 45%)',
      color: 'hsl(0, 0%, 100%)',
      fontFamily: styleVars.fontFamily,
      margin: 13,
      fontSize: 13,
      maxWidth: 300,
      padding: 0,
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 900,
    },
    title: {
      padding: 10,
      paddingBottom: 8,
      fontWeight: 'bold',
      fontSize: 14,
    },
    table: {
      borderSpacing: 0,
    },
    tr1: {
      background: 'hsl(0, 0%, 55%)',
    },
    tr2: {
      background: 'hsl(0, 0%, 50%)',
    },
    td: {
      padding: 10,
      borderSpacing: 0,
      verticalAlign: 'top',
      textAlign: 'left',
    },
    tdValue: {
      fontFamily: 'menlo',
      padding: 10,
      borderSpacing: 0,
      verticalAlign: 'top',
      textAlign: 'right',
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
