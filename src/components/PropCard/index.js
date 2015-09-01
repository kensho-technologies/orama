
import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

const styles = {
  item: {
    background: 'hsl(0, 0%, 90%)',
    fontSize: 15,
    margin: 5,
    padding: 5,
    cursor: 'pointer',
  },
}

const cardSource = {
  beginDrag(props) {
    return {
      text: props.text,
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export const PropCard = React.createClass({
  displayName: 'PropCard',
  propTypes: {
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    text: PropTypes.string,
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    const { isDragging, connectDragSource, text } = this.props
    return connectDragSource(
      <div style={{...styles.item, opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    )
  },
})

export default DragSource('CARD', cardSource, collect)(PropCard)
