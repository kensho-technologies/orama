
export const title = 'Brushable Histogram'
export const tags = []
export const hide = false
export const date = new Date('Wed Mar 16 2016 13:45:05 GMT-0400 (EDT)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Bars, Brush, Layer} from '../../../'
import {State} from 'on-update'
import * as d3Array from 'd3-array'
import _ from 'lodash/fp'
import {getPath2D} from '../../../utils/path2DUtils'
import {getPlotValues} from '../../../Layer/getPlotValues'
import {getMinY, getMaxY} from '../../../utils/rectUtils'
import {getTicks} from '../../../chartCore/getForKey'

const hist = d3Array.histogram()
  .thresholds(35)

const getHistData = _.flow(
  hist,
  _.map(({x0, x1, length}) => ({x1: x0, x2: x1, y: length})),
)
const getDevData = data => {
  const mean = d3Array.mean(data)
  const dev = d3Array.deviation(data)
  return [
    {text: '-1 SD', value: mean - dev},
    {text: 'μ', value: mean},
    {text: '1 SD', value: mean + dev},
  ]
}

const ticksTop = (props) => {
  if (!props.xScale) return undefined
  const {
    theme,
    xScale,
    plotRect,
  } = props
  const ticksRData = _.map((datum, idx) => {
    const path2D = getPath2D()
    const values = getPlotValues(props, datum, idx)
    path2D.moveTo(values.x, getMinY(plotRect) - 15)
    path2D.lineTo(values.x, getMinY(plotRect) - 5)
    return {
      ...values,
      path2D,
      type: 'line',
    }
  }, props.data)
  const textRData = _.map(
    d => ({
      type: 'text',
      text: d.text,
      x: xScale(d.value),
      y: plotRect.y - 25,
      textAlign: 'center',
      textBaseline: 'middle',
      fill: theme.textFill,
      font: `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`,
    }), props.data)
  return _.flatten([ticksRData, textRData])
}
const ticksBottom = (props) => {
  if (!props.xScale) return undefined
  const {
    theme,
    xScale,
    plotRect,
  } = props
  const xTicks = getTicks(props, 'x')
  const ticksRData = _.map((datum, idx) => {
    const path2D = getPath2D()
    const values = getPlotValues(props, datum, idx)
    path2D.moveTo(values.x, getMaxY(plotRect) + 15)
    path2D.lineTo(values.x, getMaxY(plotRect) + 5)
    return {
      ...values,
      path2D,
      type: 'line',
    }
  }, xTicks)
  const textRData = _.map(
    d => ({
      type: 'text',
      text: d.text,
      x: xScale(d.value),
      y: getMaxY(plotRect) + 25,
      textAlign: 'center',
      textBaseline: 'middle',
      fill: theme.textFill,
      font: `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`,
    }), xTicks)
  return _.flatten([ticksRData, textRData])
}

const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
  })
}

export const Component = props =>
  <Brush
    onUpdate={childProps => handleUpdate(props, childProps)}
    xDomain={props.xDomain}
  >
    <Chart
      proportion={0.25}
      yShowTicks={false}
      xShowTicks={false}
      yShowGuides={false}
      xShowGuides={false}
      yShowLabel={false}
      xShowLabel={false}
      margin={{top: 40, bottom: 40}}
      backgroundOffset={0}
    >
      <Bars
        data={props.data}
        x1='x1' x2='x2' y='y'
        fillValue='gray'
      />
      <Layer // ticksTop
        showHover={false}
        clipPlot={false}
        plot={ticksTop}
        skipExtractArrays
        data={props.devData}
        x='value'
        strokeValue='gray'
      />
      <Layer // ticksBottom
        clipPlot={false}
        showHover={false}
        plot={ticksBottom}
        skipExtractArrays
        x='value'
        strokeValue='gray'
      />
    </Chart>
  </Brush>
Component.defaultProps = {
  data: [],
}


const startWith = props => {
  props.setState({xDomain: [48, 83]})
}

export const DataVis = props => {
  const dataArray = _.map('Adj. Close', props.fbData)
  return (
    <State startWith={startWith}>
      <Component
        {...props}
        data={getHistData(dataArray)}
        devData={getDevData(dataArray)}
      />
    </State>
  )
}
