
import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

import {DEFAULT_THEME} from '../defaultTheme'

import {autoprefix} from '../Display/methods'

const cardSource = {
  beginDrag(props) {
    return {
      prop: props.prop,
    }
  },
}

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

/**
 * Component responsible for the draggable cards on list of data properties (DataList)
 */
export const PropCard = React.createClass({
  displayName: 'PropCard',
  propTypes: {
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    prop: PropTypes.string,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      theme: {...DEFAULT_THEME},
    }
  },
  render() {
    const {theme, isDragging, connectDragSource, prop} = this.props
    return connectDragSource(
      <div
        style={autoprefix({
          background: 'hsl(0, 0%, 90%)',
          cursor: 'pointer',
          display: 'flex',
          flexShrink: 0,
          fontSize: theme.fontSize,
          margin: 5,
          opacity: isDragging ? 0.5 : 1,
          padding: 5,
        })}
      >
          {prop}
      </div>
    )
  },
})

export default DragSource('CARD', cardSource, collect)(PropCard)
