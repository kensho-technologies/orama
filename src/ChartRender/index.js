
import React, {PropTypes} from 'react'

import {DEFAULT_THEME} from '../defaultTheme'

import {map} from 'lodash'

import {basicRender} from '../CanvasRender/renders'
import {highlightRender} from '../CanvasRender/renders'
import {hoverRender} from '../CanvasRender/renders'
import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import {CanvasInput} from '../CanvasInput'
import {CanvasRender} from '../CanvasRender'

const handleCanvasInputUpdate = (props, childProps) => {
  props.onState({
    hoverRenderData: childProps.hoverRenderData,
  })
  props.onUpdate(childProps)
}
/*
Used inside <ChartRenderWrapper/>
*/
const _ChartRender = props => (
  <Block>
    {map(
      props.renderLayers,
      (renderLayer, i) => (
        <CanvasRender // basicRender
          clip={true}
          height={props.height}
          key={i}
          plotRect={props.plotRect}
          render={basicRender}
          renderData={renderLayer.renderData}
          theme={props.theme}
          width={props.width}
        />
      )
    )}
    <CanvasRender // highlightRender
      clip={true}
      height={props.height}
      plotRect={props.plotRect}
      render={highlightRender}
      renderData={props.highlightData}
      theme={props.theme}
      width={props.width}
    />
    <CanvasRender // hoverRender
      clip={true}
      height={props.height}
      plotRect={props.plotRect}
      render={hoverRender}
      renderData={props.hoverRenderData}
      theme={props.theme}
      width={props.width}
    />
    <CanvasInput
      height={props.height}
      onUpdate={childProps => handleCanvasInputUpdate(props, childProps)}
      renderLayers={props.renderLayers}
      theme={props.theme}
      width={props.width}
    />
  </Block>
)

_ChartRender.propTypes = {
  height: PropTypes.number,
  highlightData: PropTypes.array,
  hoverRenderData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderLayers: PropTypes.array,
  theme: PropTypes.object,
  width: PropTypes.number,
}
_ChartRender.defaultProps = {
  theme: DEFAULT_THEME,
}

export const ChartRender = stateHOC(_ChartRender)
