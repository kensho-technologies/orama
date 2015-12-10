
import React, {PropTypes} from 'react'
import {stateHOC} from 'on-update'
import {getWindow} from '../utils/windowUtils'

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
  const _window = getWindow()
  if (!props.width || !props.height) {
    return {}
  }
  const pos = {}
  if (props.mouse.x + props.width + TOOLTIP_MARGIN * 2 + 1 > _window.innerWidth) {
    if (props.width + TOOLTIP_MARGIN * 2 > props.mouse.x) {
      pos.left = 0
    } else {
      pos.right = _window.innerWidth - props.mouse.x
    }
  } else {
    pos.left = props.mouse.x
  }
  if (props.mouse.y + props.height + TOOLTIP_MARGIN * 2 + 1 > _window.innerHeight) {
    if (props.height + TOOLTIP_MARGIN * 2 > props.mouse.y) {
      pos.top = 0
    } else {
      pos.bottom = _window.innerHeight - props.mouse.y
    }
  } else {
    pos.top = props.mouse.y
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
  </BlockSize>
)
_TooltipWrapper.propTypes = {
  mouse: PropTypes.object,
  theme: PropTypes.object,
}
export const TooltipWrapper = stateHOC(_TooltipWrapper)
