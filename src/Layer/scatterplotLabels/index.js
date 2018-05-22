// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {getPlotValues} from '../getPlotValues'
import {getCachedContext} from '../../utils/canvasUtils'
import labeler from '../../utils/labeler'
import {DEFAULT_THEME} from '../../defaultTheme'

const localLabeler = labeler()
const ctx = getCachedContext()

const getTextRenderData = (props, datum, idx) => {
  const {plotRect, theme = DEFAULT_THEME, scatterplotLabelsBounds = true} = props
  const values = getPlotValues(props, datum, idx, {
    text: '',
    fill: theme.textFill,
  })

  ctx.save()
  ctx.font = `${theme.plotFontSize}px ${theme.fontFamilyMono}`
  const width = ctx.measureText(values.text).width
  ctx.restore()

  if (scatterplotLabelsBounds) {
    if (values.x + width > plotRect.width + plotRect.x) {
      values.x = values.x - width - 20
    }
    if (values.y < plotRect.y + 20) values.y += 20
  }

  return {
    ...values,
    id: idx,
    name: values.text,
    width: width + 10,
    selected: true,
    height: 22,
    textAlign: 'left',
    textBaseline: 'middle',
    type: 'text',
  }
}

export const scatterplotLabels = props => {
  if (!props.xScale && !props.yScale) return undefined

  const labelData = _.map(_.flatten(props.data), (datum, idx) =>
    getTextRenderData(props, datum, idx)
  )

  const anchorData = _.map(labelData, d => ({
    x: d.x,
    y: d.y,
    r: 8,
  }))

  localLabeler
    .plotRect(_.cloneDeep(props.plotRect))
    .label(labelData)
    .anchor(anchorData)
    .start(100)

  return labelData
}
