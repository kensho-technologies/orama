// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import basicRender from '../CanvasRender/basicRender'
import CanvasRender from '../CanvasRender'

export default function ChartLayers(props) {
  const {renderLayers, rootProps, theme} = props
  return map(renderLayers, (renderLayer, i) => (
    <CanvasRender
      clip
      height={rootProps.height}
      key={i}
      layerProps={renderLayer.layerProps}
      plotRect={rootProps.plotRect}
      render={basicRender}
      renderData={renderLayer.renderData}
      theme={theme}
      width={rootProps.width}
    />
  ))
}

ChartLayers.propTypes = {
  renderLayers: PropTypes.array,
  rootProps: PropTypes.object,
  theme: PropTypes.object.isRequired,
}
