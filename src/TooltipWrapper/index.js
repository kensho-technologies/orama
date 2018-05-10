// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import stateHOC from '../utils/stateHOC'
import {getWindow} from '../utils/windowUtils'

import {BlockSize} from '../utilComponents/BlockSize'
import Portal from '../utilComponents/Portal'
import {Tooltip as DefaultTooltip} from '../Tooltip'

const TOOLTIP_MARGIN = 15

const handleBlockSizeUpdate = (props, childProps) => {
  props.onState({
    width: childProps.width,
    height: childProps.height,
  })
}
export const getTooltipPosition = props => {
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

export const _TooltipWrapper = props => {
  if (!props.mouse || !props.hoverData) return null
  const {
    Tooltip = DefaultTooltip,
  } = props.layerProps
  return (
    <Portal>
      <BlockSize
        onUpdate={childProps => handleBlockSizeUpdate(props, childProps)}
        style={{
          margin: TOOLTIP_MARGIN,
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: '999999',
          ...getTooltipPosition(props),
        }}
      >
        <Tooltip
          hoverData={props.hoverData}
          layerProps={props.layerProps}
          theme={props.theme}
        />
      </BlockSize>
    </Portal>
  )
}
_TooltipWrapper.propTypes = {
  hoverData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  layerProps: PropTypes.object,
  mouse: PropTypes.object,
  theme: PropTypes.object,
}
export const TooltipWrapper = stateHOC(_TooltipWrapper)
