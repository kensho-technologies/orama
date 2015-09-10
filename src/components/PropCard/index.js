
import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars) {
  return {
    item: {
      background: 'hsl(0, 0%, 90%)',
      fontSize: styleVars.fontSize,
      margin: 5,
      padding: 5,
      cursor: 'pointer',
    },
  }
}

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
    styleVars: PropTypes.object,
  },
  getDefaultProps() {
    return {
      styleVars: {...defaultStyleVars},
    }
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    const { isDragging, connectDragSource, prop } = this.props
    return connectDragSource(
      <div style={{...styles.item, opacity: isDragging ? 0.5 : 1 }}>
        {prop}
      </div>
    )
  },
})

export default DragSource('CARD', cardSource, collect)(PropCard)
