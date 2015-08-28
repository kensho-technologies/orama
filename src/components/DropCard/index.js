
import React, {PropTypes} from 'react'
import R from 'ramda'

import { DropTarget } from 'react-dnd'

const styles = {
  item: {
    background: 'hsl(0, 0%, 90%)',
    fontSize: 15,
    margin: 5,
    padding: 5,
  },
}

function collect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    didDrop: monitor.didDrop(),
    item: monitor.getItem(),
  }
}

export var DropCard = React.createClass({
  displayName: 'DropCard',
  propTypes: {
    canDrop: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    setText: PropTypes.func,
    text: PropTypes.string,
  },
  getDefaultProps() {
    return {
    }
  },
  getInitialState() {
    return {
      text: 'DROP',
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.isOver && nextProps.didDrop) {
      this.props.setText(nextProps.item.text)
    }
  },
  render() {
    const { isOver, canDrop, connectDropTarget } = this.props
    const localStyle = R.mergeAll([
      styles.item,
      isOver ? {background: 'gray'} : null,
      canDrop ? {border: '1px solid black'} : null,
    ])
    return connectDropTarget(
      <div style={localStyle}>
        {this.props.text}
      </div>
    )
  },
})

export default DropTarget('CARD', {}, collect)(DropCard)
