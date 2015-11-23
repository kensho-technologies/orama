
import React, {PropTypes} from 'react'
import _ from 'lodash'
import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'
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
import {getRenderData} from './getRenderData'

import {Block} from '@luiscarli/display'
import ChartRenderWrapper from '../ChartRenderWrapper'
import ChartBackground2 from '../ChartBackground2'

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
const Chart2 = props => {
  const transformedProps = transformProps(props)
  const renderData = getRenderData(transformedProps)
  return (
    <Block
      position='relative'
    >
      <ChartBackground2
        {...transformedProps}
      />
      <ChartRenderWrapper
        annotationData={[]}
        highlightData={[]}
        plotRect={transformedProps.plotRect}
        renderData={renderData}
        size={transformedProps.size}
        theme={transformedProps.theme}
      />
    </Block>
  )
}
Chart2.propTypes = {
  data: PropTypes.array,
  layers: PropTypes.array,
  onUpdate: PropTypes.func,
  plot: PropTypes.func,
  radius: PropTypes.string,
  theme: PropTypes.object,
  x: PropTypes.string,
  y: PropTypes.string,
}
Chart2.defaultProps = {
  backgroundOffset: BACKGROUND_OFFSET,
  theme: defaultTheme,
  size: {width: 500, height: 500},
  plot: points,
}

const initialState = {
}

export default stateHOC(Chart2, initialState)
