// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

/*
The <Draggable/> component makes its child 'draggable' by ovveriden its mouseDown, it does not wrap the child in another <div/> or <span/>.
The onUpdate callback is called with `{deltaX, deltaY}` position from the last call.

@example
const handleDraggableUpdate = (props, childProps) => {
  props.onState({
    x: props.x - childProps.deltaX,
    y: props.y - childProps.deltaY,
  })
}
const slider = props => (
  <Block>
    <Draggable
      onUpdate={childProps => handleDraggableUpdate(props, childProps)}
    >
      <Block padding={30}/>
    </Draggable>
  </Block>
)
*/
export class Draggable extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    onUpdate: PropTypes.func.isRequired,
  }
  updateOnlyTypes = {
    deltaX: PropTypes.number,
    deltaY: PropTypes.number,
  }
  canUpdate = [
    'deltaX', 'deltaY',
  ]
  static defaultProps = {
    initialPos: {x: 0, y: 0},
  }
  state = {
    dragging: false,
  }
  componentDidUpdate = (props, state) => {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }
  // calculate relative position to the mouse and set dragging=true
  onMouseDown = (evt) => {
    // only left mouse button
    if (evt.button !== 0) return
    evt.stopPropagation()
    evt.preventDefault()
    this.pos = {
      x: evt.clientX,
      y: evt.clientY,
    }
    this.setState({
      dragging: true,
    })
  }
  onMouseUp = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    this.setState({dragging: false})
  }
  onMouseMove = (evt) => {
    if (!this.state.dragging) return
    evt.stopPropagation()
    evt.preventDefault()
    this.props.onUpdate({
      ...this.props,
      deltaX: this.pos.x - evt.clientX,
      deltaY: this.pos.y - evt.clientY,
    })
    this.pos = {
      x: evt.clientX,
      y: evt.clientY,
    }
  }
  render() {
    return (
      React.cloneElement(
        React.Children.only(this.props.children),
        {onMouseDown: this.onMouseDown},
      )
    )
  }
}
