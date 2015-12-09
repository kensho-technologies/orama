
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {basicRender} from './basicRender'
import {stateHOC} from 'on-update'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */

const handleCanvasRef = (props, canvas) => {
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.scale(2, 2)
    props.render(props, ctx)
    ctx.restore()
  }
}
export const _CanvasRender = props => (
  <canvas
    height={props.size.height * 2}
    ref={canvas => handleCanvasRef(props, canvas)}
    style={{
      display: 'block',
      height: props.size.height,
      position: 'absolute',
      width: props.size.width,
    }}
    width={props.size.width * 2}
  />
)
_CanvasRender.propTypes = {
  clip: PropTypes.bool,
  plotRect: PropTypes.object,
  render: PropTypes.func.isRequired,
  renderData: PropTypes.array,
  size: PropTypes.object.isRequired,
}
_CanvasRender.defaultProps = {
  render: basicRender,
  renderData: [],
  size: {width: 0, height: 0},
  theme: DEFAULT_THEME,
}
export const CanvasRender = stateHOC(_CanvasRender)
