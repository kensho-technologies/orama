// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import basicRender from '../CanvasRender/basicRender'
import CanvasRender from '../CanvasRender'
import {THEME} from '../defaults'

// used inside <Chart />
export default function ChartRender(props) {
  return (
    <div>
      {map(props.renderLayers, (renderLayer, i) => (
        <CanvasRender // basicRender
          clip
          height={props.rootProps.height}
          key={i}
          layerProps={renderLayer.layerProps}
          plotRect={props.rootProps.plotRect}
          render={basicRender}
          renderData={renderLayer.renderData}
          theme={props.theme}
          width={props.rootProps.width}
        />
      ))}
    </div>
  )
}

ChartRender.propTypes = {
  renderLayers: PropTypes.array,
  rootProps: PropTypes.object,
  theme: PropTypes.object,
}

ChartRender.defaultProps = {
  theme: THEME,
}
