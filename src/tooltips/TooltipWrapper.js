// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import isBrowser from '../constants/isBrowser'
import withControlledState from '../enhancers/withControlledState'

import BlockSize from './BlockSize'
import Portal from './Portal'
import DefaultTooltip from './Tooltip'

const MARGIN = 15

export function getTooltipPosition(mouse, height, width) {
  if (!width || !height) return {}
  const innerHeight = isBrowser ? window.innerHeight : 1000
  const innerWidth = isBrowser ? window.innerWidth : 1000
  const pos = {}
  if (mouse.x + width + MARGIN * 2 + 1 > innerWidth) {
    if (width + MARGIN * 2 > mouse.x) pos.left = 0
    else pos.right = innerWidth - mouse.x
  } else pos.left = mouse.x
  if (mouse.y + height + MARGIN * 2 + 1 > innerHeight) {
    if (height + MARGIN * 2 > mouse.y) pos.top = 0
    else pos.bottom = innerHeight - mouse.y
  } else pos.top = mouse.y
  return pos
}

function TooltipWrapper(props) {
  const {height, hoverData, layerProps, mouse, onState, theme, width} = props
  if (!mouse || !hoverData) return null
  const {Tooltip = DefaultTooltip} = layerProps
  const style = {
    margin: MARGIN,
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: '999999',
    ...getTooltipPosition(mouse, height, width),
  }
  const handleUpdate = childProps => onState({height: childProps.height, width: childProps.width})
  return (
    <Portal>
      <BlockSize onUpdate={handleUpdate} style={style}>
        <Tooltip hoverData={hoverData} layerProps={layerProps} theme={theme} />
      </BlockSize>
    </Portal>
  )
}

TooltipWrapper.propTypes = {
  height: PropTypes.number,
  hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  layerProps: PropTypes.object,
  mouse: PropTypes.object,
  onState: PropTypes.func.isRequired,
  theme: PropTypes.object,
  width: PropTypes.number,
}

export default withControlledState(TooltipWrapper)
