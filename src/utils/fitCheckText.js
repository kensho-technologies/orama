// Copyright 2018 Kensho Technologies, LLC.

import {update} from 'lodash'

import {getTextWidth} from '../chartCore/getPlotRect'

function getTextBounds(textObj, isRotated, theme) {
  const textAlign = textObj.textAlign || 'left'
  const textWidth = getTextWidth(theme, textObj.text) * (textAlign === 'center' ? 0.5 : 1)
  const initialCoord = isRotated ? textObj.y : textObj.x
  const rightAligned = ['right', 'end'].includes(textAlign)
  const leftAligned = ['left', 'start'].includes(textAlign)

  /* eslint-disable no-bitwise */
  return {
    textStart: !(isRotated ^ leftAligned) ? initialCoord - textWidth : initialCoord,
    textEnd: !(isRotated ^ rightAligned) ? initialCoord + textWidth : initialCoord,
  }
  /* eslint-enable no-bitwise */
}

export default function fitCheckText(textObj, canvasWidth, canvasHeight, theme) {
  const updateTextObj = (key, toAdd) => update(textObj, key, val => val + toAdd)

  updateTextObj('x', textObj.xOffset || 0)
  updateTextObj('y', textObj.yOffset || 0)
  const isRotated = Boolean(textObj.rotate)

  const {textStart, textEnd} = getTextBounds(textObj, isRotated, theme)

  const overFlow = textEnd - (isRotated ? canvasHeight : canvasWidth)
  const underFlow = -textStart

  const shift = (overFlow > 0 && -overFlow) || (underFlow > 0 && underFlow) || 0

  return updateTextObj(isRotated ? 'y' : 'x', shift)
}
