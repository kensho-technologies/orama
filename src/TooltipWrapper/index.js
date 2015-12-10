
import React, {PropTypes} from 'react'
import {stateHOC} from 'on-update'
import {getWindow} from '../utils/windowUtils'
import {extractTooltipData} from '../Chart/extractTooltipData'

import {BlockSize} from '../BlockSize'
import {Tooltip} from '../Tooltip'

const TOOLTIP_MARGIN = 15

const handleBlockSizeUpdate = (props, childProps) => {
  props.onState({
    width: childProps.width,
    height: childProps.height,
  })
}
const getTooltipPosition = props => {
  const {
    mouse,
    width,
    height,
  } = props
  if (!width || !height) {
    return {}
  }
  const _window = getWindow()
  const pos = {}
  if (mouse.x + width + TOOLTIP_MARGIN * 2 + 1 > _window.innerWidth) {
    if (width + TOOLTIP_MARGIN * 2 > mouse.x) {
      pos.left = 0
    } else {
      pos.right = _window.innerWidth - mouse.x
    }
  } else {
    pos.left = mouse.x
  }
  if (mouse.y + height + TOOLTIP_MARGIN * 2 + 1 > _window.innerHeight) {
    if (height + TOOLTIP_MARGIN * 2 > mouse.y) {
      pos.top = 0
    } else {
      pos.bottom = _window.innerHeight - mouse.y
    }
  } else {
    pos.top = mouse.y
  }
  return pos
}

const _TooltipWrapper = props => (
  <BlockSize
    margin={TOOLTIP_MARGIN}
    onUpdate={childProps => handleBlockSizeUpdate(props, childProps)}
    pointerEvents='none'
    position='fixed'
    zIndex='999999'
    {...getTooltipPosition(props)}
  >
    <Tooltip
      {...extractTooltipData(
        props.layerProps,
        props.layerProps.dimensions,
        props.hoverData,
      )}
    />
  </BlockSize>
)
_TooltipWrapper.propTypes = {
  hoverData: PropTypes.array,
  layerProps: PropTypes.object,
  mouse: PropTypes.object,
  theme: PropTypes.object,
}
export const TooltipWrapper = stateHOC(_TooltipWrapper)
