/* eslint react/prop-types:0 */

export const title = '"Financial" Axis'
export const tags = []
export const date = new Date('July 14, 2016')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import _ from 'lodash/fp'
import {format as d3Format} from 'd3-format'

import {Chart, Lines, Layer} from '../../../'
import {getPath2D} from '../../../utils/path2DUtils'
import {getPlotValues} from '../../../Layer/getPlotValues'
import {getMinX, getMaxX} from '../../../utils/rectUtils'
import {getTicks} from '../../../chartCore/getForKey'
import {getCachedContext} from '../../../utils/canvasUtils'
import labeler from '../../../utils/labeler'
import {DEFAULT_THEME} from '../../../defaultTheme'

const localLabeler = labeler()
const ctx = getCachedContext()
const nFormat = d3Format('.2f')

const filterData = _.map(
  data => _.filter(
    d => d.Date > new Date(2014, 0, 1) && d.Date < new Date(2016, 2, 1),
    data,
  )
)

const getMarginRight = ({data, y, yTickFormat, theme}) => {
  ctx.save()
  ctx.font = `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`
  const maxWidth = _.reduce(
    (acc, d) => _.max([
      acc,
      ctx.measureText(yTickFormat(_.get(y, d))).width,
    ]),
    0,
    data,
  )
  ctx.restore()
  return maxWidth
}

const getLabelBox = (labelData, anchorData) =>
  _.map(
    d => {
      const path2D = getPath2D()
      path2D.rect(d[0].x - 6, d[0].y - d[0].height / 2, d[0].width, d[0].height)
      return {
        path2D,
        fill: d[0].boxFill,
        type: 'area',
      }
    },
    _.zip(labelData, anchorData),
  )

const getTextRenderData = (props, datum, idx) => {
  const {
    theme,
    yTickFormat = d => d,
  } = props
  const values = getPlotValues(props, datum, idx, {
    text: '',
  })

  ctx.save()
  ctx.font = `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`
  const width = ctx.measureText(yTickFormat(values.text)).width
  ctx.restore()

  return {
    ...values,
    boxFill: values.fill,
    fill: theme.textFill,
    id: idx,
    name: values.text,
    width: width + 7,
    selected: true,
    height: 22,
    textAlign: 'left',
    textBaseline: 'middle',
    fontSize: theme.axisTickFontSize,
    type: 'text',
    text: yTickFormat(values.text),
  }
}

export const labelsRight = (props) => {
  if (!props.xScale && !props.yScale) return undefined

  const labelData = _.map(
    (datum, idx) => getTextRenderData(props, datum, idx),
    _.flatten(props.data),
  )

  const anchorData = _.map(
    (d) => ({
      x: d.x,
      y: d.y,
      r: 8,
    }),
    labelData,
)

  localLabeler
    .plotRect(_.cloneDeep(props.plotRect))
    .label(labelData)
    .anchor(anchorData)
    .start(100)

  const labelBox = getLabelBox(labelData, anchorData)
  return _.concat(labelBox, labelData)
}

const ticksRight = (props) => {
  if (!props.xScale) return undefined
  const {
    theme,
    yScale,
    plotRect,
  } = props
  const yTicks = getTicks(props, 'y')
  const ticksRData = _.map((datum, idx) => {
    const path2D = getPath2D()
    const values = getPlotValues(props, datum, idx)
    path2D.moveTo(getMinX(plotRect), values.y)
    path2D.lineTo(getMaxX(plotRect), values.y)
    return {
      ...values,
      path2D,
      type: 'line',
    }
  }, yTicks)
  const textRData = _.map(
    d => ({
      type: 'text',
      text: d.text,
      y: yScale(d.value),
      x: getMaxX(plotRect) + 7,
      textAlign: 'left',
      textBaseline: 'middle',
      fill: theme.textFill,
      font: `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`,
    }), yTicks)
  return _.flatten([ticksRData, textRData])
}

export const DataVis = props => {
  const lastData = _.map(_.last, filterData([props.applData, props.fbData]))
  const marginRight = getMarginRight({
    data: lastData,
    theme: DEFAULT_THEME,
    yTickFormat: nFormat,
    y: 'Adj. Close',
  })
  return <Chart
    yNice={true}
    yShowTicks={false}
    yShowGuides={false}
    yShowLabel={false}
    margin={{top: 5, right: marginRight + 15}}
    backgroundOffset={0}
  >
    <Layer
      clipPlot={false}
      showHover={false}
      plot={ticksRight}
      skipExtractArrays
      y='value'
      strokeValue='lightgray'
      lineWidthValue={1}
    />
    <Lines
      data={filterData([props.applData, props.fbData])}
      stroke='Name'
      title='Name'
      x='Date'
      y='Adj. Close'
    />
    <Layer
      plot={labelsRight}
      data={lastData}
      showHover={false}
      x='Date'
      y='Adj. Close'
      fill='Name'
      text='Adj. Close'
      xOffsetValue={-3}
      textBaseline={'middle'}
      yTickFormat={nFormat}
      clipPlot={false}
    />
  </Chart>
}
