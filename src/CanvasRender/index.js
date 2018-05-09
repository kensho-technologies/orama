// Copyright 2017 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {DEFAULT_THEME} from '../defaultTheme'
import {WIDTH, HEIGHT} from '../chartCore/defaults'
import {basicRender} from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export class CanvasRender extends React.Component {
  static propTypes = {
    clip: PropTypes.bool,
    height: PropTypes.number.isRequired,
    plotRect: PropTypes.object,
    render: PropTypes.func.isRequired,
    renderData: PropTypes.array,
    renderLayers: PropTypes.array,
    width: PropTypes.number.isRequired,
  }
  static defaultProps = {
    render: basicRender,
    width: WIDTH,
    height: HEIGHT,
    theme: DEFAULT_THEME,
  }
  handleCanvasRef = (canvasNode) => {
    this.canvasNode = canvasNode
  }
  componentDidMount = () => {
    this.handleUpdate(this.props)
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.width !== nextProps.width || this.props.height !== nextProps.height) return true
    return false
  }
  componentDidUpdate = () => {
    this.handleUpdate(this.props)
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.renderData !== nextProps.renderData) {
      this.handleUpdate(nextProps)
    }
    if (this.props.renderLayers !== nextProps.renderLayers) {
      this.handleUpdate(nextProps)
    }
  }
  handleUpdate = (props) => {
    const ctx = this.canvasNode.getContext('2d')
    ctx.save()
    ctx.scale(2, 2)
    this.props.render(props, ctx)
    ctx.restore()
  }
  render() {
    return (
      <canvas
        height={this.props.height * 2}
        ref={this.handleCanvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          width: this.props.width,
          height: this.props.height,
        }}
        width={this.props.width * 2}
      />
    )
  }
}
