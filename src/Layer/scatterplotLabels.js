// Copyright 2018 Kensho Technologies, LLC.

import {cloneDeep, flatten, map} from 'lodash'

import withCachedContext from '../utils/withCachedContext'
import labeler from '../utils/labeler'
import DEFAULT_THEME from '../defaultTheme'

import getPlotValues from './getPlotValues'

const localLabeler = labeler()

function getTextRenderData(props, datum, idx) {
  const {plotRect, theme = DEFAULT_THEME, scatterplotLabelsBounds = true} = props
  const values = getPlotValues(props, datum, idx, {
    text: '',
    fill: theme.textFill,
  })

  const width = withCachedContext(ctx => {
    if (!ctx) return values.text.length
    ctx.font = `${theme.plotFontSize}px ${theme.fontFamilyMono}`
    return ctx.measureText(values.text).width
  })

  if (scatterplotLabelsBounds) {
    if (values.x + width > plotRect.width + plotRect.x) values.x = values.x - width - 20
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

export default function scatterplotLabels(props) {
  if (!props.xScale && !props.yScale) return undefined

  const labelData = map(flatten(props.data), (datum, idx) => getTextRenderData(props, datum, idx))

  const anchorData = map(labelData, d => ({
    x: d.x,
    y: d.y,
    r: 8,
  }))

  localLabeler
    .plotRect(cloneDeep(props.plotRect))
    .label(labelData)
    .anchor(anchorData)
    .start(100)

  return labelData
}
