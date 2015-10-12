
import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

import defaultTheme from '../defaultTheme'

import {Flex} from '../Display'

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
      theme: {...defaultTheme},
    }
  },
  render() {
    const {theme, isDragging, connectDragSource, prop} = this.props
    return connectDragSource(
      <Flex
        background={'hsl(0, 0%, 90%)'}
        cursor={'pointer'}
        flexShrink={0}
        fontSize={theme.fontSize}
        margin={5}
        opacity={isDragging ? 0.5 : 1}
        padding={5}
      >
        {prop}
      </Flex>
    )
  },
})

export default DragSource('CARD', cardSource, collect)(PropCard)
