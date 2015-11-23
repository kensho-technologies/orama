
import React, {PropTypes} from 'react'

export default React.createClass({
  displayName: 'Draggable',
  propTypes: {
    children: PropTypes.element,
    onUpdate: PropTypes.func.isRequired,
  },
  updateOnlyTypes: {
    deltaX: PropTypes.number,
    deltaY: PropTypes.number,
  },
  canUpdate: [
    'deltaX', 'deltaY',
  ],
  getDefaultProps() {
    return {
      initialPos: {x: 0, y: 0},
    }
  },
  getInitialState() {
    return {
      dragging: false,
    }
  },
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },
  // calculate relative position to the mouse and set dragging=true
  onMouseDown(evt) {
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
  },
  onMouseUp(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    this.setState({dragging: false})
  },
  onMouseMove(evt) {
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
  },
  render() {
    return (
      React.cloneElement(
        React.Children.only(this.props.children),
        {onMouseDown: this.onMouseDown},
      )
    )
  },
})
