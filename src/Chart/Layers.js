// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import * as CustomPropTypes from '../CustomPropTypes'
import Canvas from '../canvas/Canvas'
import basicRender from '../canvas/basicRender'

export default function Layers(props) {
  const {backgroundOffset, height, plotRect, renderLayers, theme, width} = props
  return map(renderLayers, (renderLayer, i) => (
    <Canvas
      backgroundOffset={backgroundOffset}
      clip
      height={height}
      key={i}
      layerProps={renderLayer.layerProps}
      plotRect={plotRect}
      render={basicRender}
      renderData={renderLayer.renderData}
      theme={theme}
      width={width}
    />
  ))
}

Layers.propTypes = {
  backgroundOffset: PropTypes.number,
  height: PropTypes.number,
  plotRect: CustomPropTypes.plotRect.isRequired,
  renderLayers: PropTypes.arrayOf(PropTypes.object),
  theme: CustomPropTypes.theme.isRequired,
  width: PropTypes.number,
}
