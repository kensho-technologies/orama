
import React, {PropTypes} from 'react'
import R from 'ramda'
import {DragSource, DropTarget} from 'react-dnd'

import defaulStyleVars from '../defaultTheme'
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

const dragSpec = {
  beginDrag(props) {
    return {
      prop: props.prop,
    }
  },
}

function dragCollect(connect) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

const dropSpec = {
  drop(props, monitor) {
    props.setProp(props.category, monitor.getItem().prop)
  },
}

function dropCollect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

/**
 * Drag and Drop card on the mapping data column
 */
export const MapDataCard = React.createClass({
  displayName: 'MapDataCard',
  propTypes: {
    canDrop: PropTypes.bool,
    category: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    data: PropTypes.array,
    isOver: PropTypes.bool,
    prop: PropTypes.string,
    setProp: PropTypes.func,
    styleVars: PropTypes.object,
  },
  getDefaultProps() {
    return {
      styleVars: {...defaulStyleVars},
    }
  },
  onClose() {
    this.props.setProp(this.props.category, undefined)
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    const {connectDragSource, connectDropTarget} = this.props
    const {isOver, canDrop} = this.props

    const containerStyle = R.mergeAll([
      styles.container,
      canDrop ? {background: 'hsl(0, 0%, 94%)'} : null,
      isOver ? {background: 'hsl(0, 0%, 88%)'} : null,
    ])

    if (!this.props.prop) {
      return connectDragSource(connectDropTarget(
        <div style={containerStyle}>
          <i>drop data</i>
        </div>
      ))
    }

    return connectDragSource(connectDropTarget(
      <div style={containerStyle}>
        <div style={styles.textContainer}>
          <div>#</div>
          <div style={styles.text}>{this.props.prop}</div>
          <div
            onClick={this.onClose}
            style={styles.closeBtn}
          >
            x
          </div>
        </div>
        <Histogram
          data={this.props.data}
          size={{width: 180, height: 40}}
          xProp={this.props.prop}
        />
      </div>
    ))
  },
})

const dragComponent = DragSource('CARD', dragSpec, dragCollect)(MapDataCard)
export default DropTarget('CARD', dropSpec, dropCollect)(dragComponent)
