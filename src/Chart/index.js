
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
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
  const transformedProps = transformProps(props)
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
        highlightData={[]}
        plotRect={transformedProps.plotRect}
        renderLayers={renderLayers}
        size={transformedProps.size}
        theme={transformedProps.theme}
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
  size: {width: 500, height: 500},
  plot: points,
}
