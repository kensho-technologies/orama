
export const title = 'Bar Labels'
export const tags = []
export const hide = false
export const date = new Date('Tue May 10 2016 18:33:39 GMT-0400 (EDT)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Bars, Layer, Highlight} from '../../../'
import {State} from 'on-update'
import _ from 'lodash'
import {getPlotValues} from '../../../Layer/getPlotValues'
import {DEFAULT_THEME} from '../../../defaultTheme'
import {getCachedContext} from '../../../utils/canvasUtils'

const ordinalData = [
  {name: 'Facebook', value: 30},
  {name: 'Amazon', value: 72},
  {name: 'Netflix', value: 120},
  {name: 'Google', value: 87.5},
]

const ctx = getCachedContext()

const getTextRenderData = (props, datum, idx) => {
  const {
    plotRect,
    theme = DEFAULT_THEME,
  } = props
  const values = getPlotValues(props, datum, idx, {
    text: '',
  })

  ctx.save()
  ctx.font = `${theme.plotFontSize}px ${theme.fontFamilyMono}`
  const width = ctx.measureText(values.text).width
  ctx.restore()

  const isInside = values.x - width > plotRect.x

  return {
    ...values,
    textAlign: isInside ? 'right' : 'left',
    xOffset: isInside ? -10 : 10,
    fill: isInside ? theme.backgroundFill : theme.textFill,
    textBaseline: 'middle',
    type: 'text',
  }
}

const barLabel = (props) => {
  if (!props.xScale && !props.yScale) return undefined
  return _.map(
    _.flatten(props.data),
    (datum, idx) => getTextRenderData(props, datum, idx),
  )
}

export const Component = () =>
  <Highlight
    Component={Bars}
    componentProps={{
      x: 'value',
      y: 'name',
    }}
  >
    <Chart>
      <Bars
        data={ordinalData}
        x='value'
        y='name'
      />
      <Layer
        plot={barLabel}
        showHover={false}
        data={ordinalData}
        x='value'
        y='name'
        text='value'
      />
    </Chart>
  </Highlight>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
