
import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

import defaulStyleVars from '../styleVars'
import Histogram from '../Histogram'

export function getStyles() {
  return {
    container: {
      margin: 5,
      padding: 5,
      background: 'hsl(0, 0%, 90%)',
      cursor: 'pointer',
    },
    textContainer: {
      display: 'flex',
    },
    text: {
      flex: '1',
      padding: '0 5px',
    },
    closeBtn: {
      fontSize: 10,
      color: 'white',
      background: 'hsl(0, 0%, 54%)',
      borderRadius: 50,
      padding: '2px 6px',
      paddingBottom: 4,
      height: 12,
    },
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      text: props.text,
    }
  },
}

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

export const MapDataCard = React.createClass({
  displayName: 'MapDataCard',
  propTypes: {
    connectDragSource: PropTypes.func,
    data: PropTypes.array,
    prop: PropTypes.string,
    styleVars: PropTypes.object,
  },
  getDefaultProps() {
    return {
      styleVars: {...defaulStyleVars},
    }
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    return this.props.connectDragSource(
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <div>#</div>
          <div style={styles.text}>{this.props.prop}</div>
          <div style={styles.closeBtn}>x</div>
        </div>
        <Histogram
          data={this.props.data}
          size={{width: 180, height: 40}}
          xProp={this.props.prop}
        />
      </div>
    )
  },
})

export default DragSource('CARD', cardSource, collect)(MapDataCard)
