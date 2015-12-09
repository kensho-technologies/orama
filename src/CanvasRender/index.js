
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {basicRender} from './basicRender'

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */

const handleCanvasRef = (props, canvas) => {
  if (canvas) {
    const ctx = canvas.getContext('2d')
    props.render(props, ctx)
  }
}
export const CanvasRender = props => (
  <canvas
    height={props.size.height}
    ref={canvas => handleCanvasRef(props, canvas)}
    style={{
      position: 'absolute',
      display: 'block',
    }}
    width={props.size.width}
  />
)
CanvasRender.propTypes = {
  clip: PropTypes.bool,
  plotRect: PropTypes.object,
  render: PropTypes.func.isRequired,
  renderData: PropTypes.array,
  size: PropTypes.object.isRequired,
}
CanvasRender.defaultProps = {
  render: basicRender,
  renderData: [],
  size: {width: 0, height: 0},
  theme: DEFAULT_THEME,
}
