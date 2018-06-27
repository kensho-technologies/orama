// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'
import isBrowser from '../constants/isBrowser'
import withControlledState from '../enhancers/withControlledState'

import BlockSize from './BlockSize'
import Portal from './Portal'
import DefaultTooltip from './Tooltip'

const MARGIN = 15

export function getTooltipTransform(mouse, height, width) {
  if (!width || !height) return {}
  const innerHeight = isBrowser ? window.innerHeight : 1000
  const innerWidth = isBrowser ? window.innerWidth : 1000
  let x
  if (mouse.x + width + MARGIN * 2 + 1 > innerWidth) {
    if (width + MARGIN * 2 > mouse.x) x = MARGIN
    else x = mouse.x - width - MARGIN
  } else x = mouse.x + MARGIN
  let y
  if (mouse.y + height + MARGIN * 2 + 1 > innerHeight) {
    if (height + MARGIN * 2 > mouse.y) y = MARGIN
    else y = mouse.y - height - MARGIN
  } else y = mouse.y + MARGIN
  return `translate(${x}px, ${y}px)`
}

function TooltipWrapper(props) {
  const {height, hoverData, layerProps, mouse, onState, theme, width} = props
  if (!mouse || !hoverData) return null
  const {Tooltip = DefaultTooltip} = layerProps
  const style = {
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 999999,
    transform: getTooltipTransform(mouse, height, width),
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
  layerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mouse: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
  onState: PropTypes.func.isRequired,
  theme: CustomPropTypes.theme,
  width: PropTypes.number,
}

export default withControlledState(TooltipWrapper)
