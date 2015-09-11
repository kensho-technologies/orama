
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
    inputWrapper: {
      display: 'flex',
      margin: 5,
    },
    input: {
      padding: 5,
      fontFamily: styleVars.font,
      fontSize: styleVars.fontSize,
      maxWidth: 150,
    },
    closeBtn: {
      fontSize: 10,
      color: 'white',
      background: 'hsl(0, 0%, 54%)',
      borderRadius: 50,
      padding: '2px 6px',
      paddingBottom: 4,
      height: 12,
      cursor: 'pointer',
      marginTop: 5,
      marginLeft: 5,
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
  getInitialState() {
    return {
      filter: '',
    }
  },
  onInputChage(event) {
    this.setState({filter: event.target.value})
  },
  onClose() {
    this.setState({filter: ''})
  },
  _getStyles: R.memoize(getStyles),
  render() {
    const styles = this._getStyles(this.props.styleVars)
    const {data} = this.props
    const keys = R.keys(R.head(data))
    const filteredKeys = R.filter(R.test(new RegExp(this.state.filter, 'i')), keys)
    const elems = R.map(d => (
      <PropCard
        key={d}
        prop={d}
      />
    ), filteredKeys)
    return (
      <div style={styles.container}>
        <div style={styles.title}>Data</div>
        <div style={styles.inputWrapper}>
          <input
            onChange={this.onInputChage}
            placeholder='search'
            style={styles.input}
            type='text'
            value={this.state.filter}
          />
          <div
            onClick={this.onClose}
            style={styles.closeBtn}
          >
            x
          </div>
        </div>
        <div style={styles.elements}>
          {elems}
        </div>
      </div>
    )
  },
})
