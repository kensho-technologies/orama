
import React from 'react'
import _ from 'lodash'

import {DEFAULT_THEME} from '../defaultTheme'
import {HEIGHT} from '../Chart/defaults'
import {WIDTH} from '../Chart/defaults'

import {addLocalDimensionsToProps} from '../Chart/addDimArrays'
import {removeDimArrays} from '../Chart/addDimArrays'
import {getMemoizeAddDimArrays} from '../Chart/memoize'
import {getMemoizeAddDomains} from '../Chart/memoize'
import {getMemoizeAddPlotRect} from '../Chart/memoize'
import {getMemoizeAddRanges} from '../Chart/memoize'
import {getMemoizeAddScales} from '../Chart/memoize'
import {getMemoizeAddTickCounts} from '../Chart/memoize'
import {getMemoizeAddTypes} from '../Chart/memoize'
import {getMemoizeForRenderLayers} from '../Chart/memoize'
import {getTheme} from '../defaultTheme'
import {PropTypes} from 'react'
import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import {ChartBackground} from '../ChartBackground'
import {ChartRender} from '../ChartRender'

/*
Used inside </>
*/
export const _Chart = props => {
  const {
    memoizers,
  } = props
  const transformProps = _.flow(
    addLocalDimensionsToProps,
    memoizers.addDimArrays,
    memoizers.addTypes,
    memoizers.addDomains,
    memoizers.addPlotRect,
    memoizers.addRanges,
    memoizers.addTickCounts,
    memoizers.addScales,
    removeDimArrays,
    _props => _.omit(_props, 'memoizers', 'onUpdate', 'onState'),
  )
  const transformedProps = transformProps({
    ...props,
    theme: getTheme(props.theme),
  })
  const renderLayers = memoizers.renderLayers(transformedProps)
  return (
    <Block
      background={props.theme.backgroundFill}
      height={transformedProps.height}
      position='relative'
      width={transformedProps.width}
    >
      <ChartBackground
        {...transformedProps}
      />
      <ChartRender
        {...transformedProps}
        renderLayers={renderLayers}
      />
    </Block>
  )
}
_Chart.propTypes = {
  data: PropTypes.array,
  layers: PropTypes.array,
  memoizers: PropTypes.object,
  onUpdate: PropTypes.func,
  plot: PropTypes.func,
  radius: PropTypes.string,
  theme: PropTypes.object,
  x: PropTypes.string,
  y: PropTypes.string,
}
_Chart.defaultProps = {
  theme: DEFAULT_THEME,
  width: WIDTH,
  height: HEIGHT,
}
_Chart.initialState = () => ({
  memoizers: {
    addDimArrays: getMemoizeAddDimArrays(),
    addTypes: getMemoizeAddTypes(),
    addDomains: getMemoizeAddDomains(),
    addPlotRect: getMemoizeAddPlotRect(),
    addRanges: getMemoizeAddRanges(),
    addTickCounts: getMemoizeAddTickCounts(),
    addScales: getMemoizeAddScales(),
    renderLayers: getMemoizeForRenderLayers(),
  },
})

export const Chart = stateHOC(_Chart)
