// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {clearAndClip} from '../clearAndClip'
import {notDatum} from '../../utils'

const extractRenderDataFromLayers = renderLayers => _.flatten(_.map(renderLayers, 'renderData'))

const getRenderObjects = props => {
  const {renderData, renderLayers} = props
  if (renderData) return renderData
  if (renderLayers) return extractRenderDataFromLayers(renderLayers)
  return []
}

const stroke = (theme, ctx, d) => {
  ctx.globalAlpha = d.strokeAlpha || d.alpha || theme.plotAlpha
  ctx.lineWidth = d.lineWidth || theme.plotLineWidth
  ctx.strokeStyle = d.stroke || theme.plotFill
  if (d.lineDash) {
    ctx.setLineDash(d.lineDash)
  }
  ctx.stroke(d.path2D)
}

export const basicRender = (props, ctx) => {
  const {theme} = props
  ctx.save()
  ctx.lineJoin = 'round'
  clearAndClip(props, ctx)
  _.each(getRenderObjects(props), d => {
    if (!d) return
    if (d.type === 'line') {
      stroke(theme, ctx, d)
    } else if (d.type === 'area') {
      ctx.globalAlpha = d.fillAlpha || d.alpha || theme.plotAlpha
      ctx.fillStyle = d.fill || theme.plotFill
      ctx.fill(d.path2D)
      if (d.stroke) stroke(theme, ctx, d)
    } else if (d.type === 'text') {
      if (notDatum(d.text)) return
      ctx.save()
      ctx.globalAlpha = d.alpha
      ctx.font = d.font || `${d.fontSize || theme.plotFontSize}px ${theme.fontFamilyMono}`
      ctx.fillStyle = d.fill || theme.textFill
      ctx.textAlign = d.textAlign || 'left'
      ctx.textBaseline = d.textBaseline || 'alphabetic'
      ctx.translate(d.x, d.y)
      ctx.rotate(d.rotate)
      ctx.fillText(d.text, 0, 0)
      ctx.restore()
    }
  })
  ctx.restore()
}
