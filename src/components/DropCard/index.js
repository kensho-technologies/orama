
import React, {PropTypes} from 'react'
import R from 'ramda'

import {DropTarget} from 'react-dnd'

const styles = {
  item: {
    background: 'hsl(0, 0%, 90%)',
    fontSize: 13,
    margin: 5,
    padding: 5,
    minHeight: 13,
  },
}

const dropSpec = {
  drop(props, monitor) {
    props.setProp(props.category, monitor.getItem().text)
  },
}

function collect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

export var DropCard = React.createClass({
  displayName: 'DropCard',
  propTypes: {
    canDrop: PropTypes.bool,
    category: PropTypes.string,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    prop: PropTypes.string,
    setProp: PropTypes.func,
  },
  getDefaultProps() {
    return {
    }
  },
  getInitialState() {
    return {
    }
  },
  render() {
    const { isOver, canDrop, connectDropTarget } = this.props
    const localStyle = R.mergeAll([
      styles.item,
      canDrop ? {background: 'hsl(139, 32%, 73%)'} : null,
      isOver ? {background: 'gray'} : null,
    ])
    return connectDropTarget(
      <div style={localStyle}>
        {this.props.prop}
      </div>
    )
  },
})

export default DropTarget('CARD', dropSpec, collect)(DropCard)
