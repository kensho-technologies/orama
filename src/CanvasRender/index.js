
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {WIDTH, HEIGHT} from '../Chart/defaults'
import {basicRender} from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export const CanvasRender = React.createClass({
  propTypes: {
    clip: PropTypes.bool,
    height: PropTypes.number.isRequired,
    plotRect: PropTypes.object,
    render: PropTypes.func.isRequired,
    renderData: PropTypes.array,
    renderLayers: PropTypes.array,
    width: PropTypes.number.isRequired,
  },
  getDefaultProps() {
    return {
      render: basicRender,
      width: WIDTH,
      height: HEIGHT,
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
    if (this.props.width !== nextProps.width || this.props.height !== nextProps.height) return true
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
        height={this.props.height * 2}
        ref={this.handleCanvasRef}
        style={{
          display: 'block',
          height: this.props.height,
          position: 'absolute',
          width: this.props.width,
        }}
        width={this.props.width * 2}
      />
    )
  },
})
