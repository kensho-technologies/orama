
import React, {PropTypes} from 'react'

export default React.createClass({
  displayName: 'Draggable',
  propTypes: {
    children: PropTypes.element,
    onChange: PropTypes.func,
  },
  getDefaultProps() {
    return {
      initialPos: {x: 0, y: 0},
      onChange: () => undefined,
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
    this.pos = {
      x: evt.clientX,
      y: evt.clientY,
    }
    this.setState({
      dragging: true,
    })
    evt.stopPropagation()
    evt.preventDefault()
  },
  onMouseUp(evt) {
    this.setState({dragging: false})
    evt.stopPropagation()
    evt.preventDefault()
  },
  onMouseMove(evt) {
    if (!this.state.dragging) return
    this.props.onChange({
      x: this.pos.x - evt.clientX,
      y: this.pos.y - evt.clientY,
    })
    this.pos = {
      x: evt.clientX,
      y: evt.clientY,
    }
    evt.stopPropagation()
    evt.preventDefault()
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
