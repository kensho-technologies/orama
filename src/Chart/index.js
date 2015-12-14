
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME, getTheme} from '../defaultTheme'
import {WIDTH, HEIGHT} from '../Chart/defaults'
import {points} from './points'
import {
  addDimArrays,
  addTypes,
  addDomains,
  addPlotRect,
  addRanges,
  addTickCounts,
  addScales,
} from './addMethods'
import {getRenderLayers} from './getRenderLayers'

import {Block} from 'react-display'
import ChartRenderWrapper from '../ChartRenderWrapper'
import {ChartBackground} from '../ChartBackground'

const transformProps = _.flow(
  addDimArrays,
  addTypes,
  addDomains,
  addPlotRect,
  addRanges,
  addTickCounts,
  addScales,
)

const BACKGROUND_OFFSET = 15

/*
Used inside </>
*/
export const Chart = props => {
  const transformedProps = transformProps({
    ...props,
    theme: getTheme(props.theme),
  })
  const renderLayers = getRenderLayers(transformedProps)
  return (
    <Block
      background={props.theme.backgroundFill}
      position='relative'
    >
      <ChartBackground
        {...transformedProps}
      />
      <ChartRenderWrapper
        annotationData={[]}
        height={transformedProps.height}
        highlightData={[]}
        plotRect={transformedProps.plotRect}
        renderLayers={renderLayers}
        size={transformedProps.size}
        theme={transformedProps.theme}
        width={transformedProps.width}
      />
    </Block>
  )
}
Chart.propTypes = {
  data: PropTypes.array,
  layers: PropTypes.array,
  onUpdate: PropTypes.func,
  plot: PropTypes.func,
  radius: PropTypes.string,
  theme: PropTypes.object,
  x: PropTypes.string,
  y: PropTypes.string,
}
Chart.defaultProps = {
  backgroundOffset: BACKGROUND_OFFSET,
  theme: DEFAULT_THEME,
  width: WIDTH,
  height: HEIGHT,
  plot: points,
}
