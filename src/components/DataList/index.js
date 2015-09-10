
import React, {PropTypes} from 'react'
import R from 'ramda'

import PropCard from '../PropCard'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars) {
  return {
    container: {
      fontFamily: styleVars.font,
      fontSize: styleVars.fontSize,
      width: 200,
      minWidth: 200,
      display: 'flex',
      flexDirection: 'column',
      background: 'hsl(0, 0%, 80%)',
    },
    title: {
      padding: 5,
      margin: 5,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    elements: {
      overflowY: 'scroll',
    },
  }
}

/**
 * Component responsible for holdind the data properties to be dragged to the data mapping.
 * It's used inside of the `Vis` component.
 */
export default React.createClass({
  displayName: 'DataList',
  propTypes: {
    data: PropTypes.array,
    styleVars: PropTypes.object,
  },
  getDefaultProps() {
    return {
      data: [],
      styleVars: {...defaultStyleVars},
    }
  },
  _getStyles: R.memoize(getStyles),
  render() {
    const styles = this._getStyles(this.props.styleVars)
    const {data} = this.props
    const keys = R.keys(R.head(data))
    const elems = R.map(d => (
      <PropCard
        key={d}
        prop={d}
      />
    ), keys)
    return (
      <div style={styles.container}>
        <div style={styles.title}>Data</div>
        <div style={styles.elements}>
          {elems}
        </div>
      </div>
    )
  },
})
