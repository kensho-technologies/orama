// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import DEFAULT_THEME from '../defaultTheme'
import {WIDTH, HEIGHT} from '../chartCore/defaults'

import basicRender from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default class CanvasRender extends React.PureComponent {
  static propTypes = {
    clip: PropTypes.bool,
    height: PropTypes.number,
    plotRect: PropTypes.object,
    render: PropTypes.func,
    renderData: PropTypes.array,
    renderLayers: PropTypes.array,
    theme: PropTypes.object,
    width: PropTypes.number,
  }

  static defaultProps = {
    render: basicRender,
    width: WIDTH,
    height: HEIGHT,
    theme: DEFAULT_THEME,
  }

  componentDidMount() {
    this.handleUpdate()
  }

  componentDidUpdate() {
    this.handleUpdate()
  }

  handleCanvasRef = canvasNode => {
    this.canvasNode = canvasNode
  }

  handleUpdate() {
    const ctx = this.canvasNode.getContext('2d')
    ctx.save()
    ctx.scale(2, 2)
    this.props.render(this.props, ctx)
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
