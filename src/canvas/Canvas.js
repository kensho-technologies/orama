// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'
import scaleRatio from '../constants/scaleRatio'

export default class Canvas extends React.Component {
  static propTypes = {
    clip: PropTypes.bool,
    height: PropTypes.number.isRequired,
    plotRect: CustomPropTypes.plotRect,
    render: PropTypes.func.isRequired,
    renderData: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    renderLayers: PropTypes.arrayOf(PropTypes.object),
    theme: CustomPropTypes.theme.isRequired,
    width: PropTypes.number.isRequired,
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
    const {render} = this.props
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.save()
    ctx.scale(scaleRatio, scaleRatio)
    render(this.props, ctx)
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
