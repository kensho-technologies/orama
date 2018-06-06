// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {THEME, WIDTH, HEIGHT} from '../defaults'
import scaleRatio from '../constants/scaleRatio'

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
    theme: THEME,
  }

  canvasRef = React.createRef()

  componentDidMount() {
    this.handleUpdate()
  }

  componentDidUpdate() {
    this.handleUpdate()
  }

  handleUpdate() {
    if (!this.canvasRef.current) return
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.save()
    ctx.scale(scaleRatio, scaleRatio)
    this.props.render(this.props, ctx)
    ctx.restore()
  }

  render() {
    const {height, width} = this.props
    const style = {display: 'block', position: 'absolute', height, width}
    return (
      <canvas
        height={height * scaleRatio}
        ref={this.canvasRef}
        style={style}
        width={width * scaleRatio}
      />
    )
  }
}
