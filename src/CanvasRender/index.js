
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {basicRender} from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRender',
  propTypes: {
    clip: PropTypes.bool,
    plotRect: PropTypes.object,
    render: PropTypes.func.isRequired,
    renderData: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      render: basicRender,
      renderData: [],
      size: {width: 0, height: 0},
      theme: {...DEFAULT_THEME},
    }
  },
  componentDidMount() {
    this.handleUpdate(this.props)
  },
  shouldComponentUpdate(nextProps) {
    if (this.props.size !== nextProps.size) return true
    return false
  },
  componentDidUpdate() {
    this.handleUpdate(this.props)
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.renderData !== nextProps.renderData) {
      this.handleUpdate(nextProps)
    }
  },
  handleUpdate(props) {
    const ctx = this.refs.canvas.getContext('2d')
    this.props.render(props, ctx)
  },
  render() {
    return (
      <canvas
        height={this.props.size.height}
        ref='canvas'
        style={{
          position: 'absolute',
          display: 'block',
        }}
        width={this.props.size.width}
      />
    )
  },
})
