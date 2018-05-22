// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {clearAndClip} from '../clearAndClip'

export const hoverRender = (props, ctx) => {
  const {renderData = [], theme} = props

  ctx.save()
  ctx.lineJoin = 'round'
  clearAndClip(props, ctx)

  _.each(renderData, d => {
    if (!d) return
    if (d.type === 'line') {
      ctx.globalAlpha = d.hoverAlpha || 0.5
      ctx.lineWidth = d.hoverLineWidth || theme.plotLineWidth
      ctx.strokeStyle = d.hoverStroke || theme.textFill
      ctx.stroke(d.path2D)
    } else if (d.type === 'area') {
      ctx.globalAlpha = d.hoverAlpha || 0.4
      ctx.fillStyle = d.hoverFill || theme.textFill
      ctx.fill(d.path2D)
    }
  })
  ctx.restore()
}
