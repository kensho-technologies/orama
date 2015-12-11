
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {basicRender} from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export const CanvasRender = React.createClass({
  propTypes: {
    clip: PropTypes.bool,
    plotRect: PropTypes.object,
    render: PropTypes.func.isRequired,
    renderData: PropTypes.array,
    renderLayers: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      render: basicRender,
      size: {width: 0, height: 0},
      theme: DEFAULT_THEME,
    }
  },
  handleCanvasRef(canvasNode) {
    this.canvasNode = canvasNode
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
    if (this.props.renderLayers !== nextProps.renderLayers) {
      this.handleUpdate(nextProps)
    }
  },
  handleUpdate(props) {
    const ctx = this.canvasNode.getContext('2d')
    ctx.save()
    ctx.scale(2, 2)
    this.props.render(props, ctx)
    ctx.restore()
  },
  render() {
    return (
      <canvas
        height={this.props.size.height * 2}
        ref={this.handleCanvasRef}
        style={{
          display: 'block',
          height: this.props.size.height,
          position: 'absolute',
          width: this.props.size.width,
        }}
        width={this.props.size.width * 2}
      />
    )
  },
})
