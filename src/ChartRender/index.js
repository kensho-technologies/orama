
import React, {PropTypes} from 'react'

import {DEFAULT_THEME} from '../defaultTheme'

import {map} from 'lodash'

import {basicRender} from '../CanvasRender/renders'
import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import {CanvasInput} from '../CanvasInput'
import {CanvasRender} from '../CanvasRender'

const handleCanvasInputUpdate = (props, childProps) => {
  props.onUpdate({
    ...childProps,
    rootProps: props.rootProps,
  })
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
          height={props.rootProps.height}
          key={i}
          layerProps={renderLayer.layerProps}
          plotRect={props.rootProps.plotRect}
          render={basicRender}
          renderData={renderLayer.renderData}
          theme={props.rootProps.theme}
          width={props.rootProps.width}
        />
      )
    )}
    <CanvasInput
      height={props.rootProps.height}
      onUpdate={childProps => handleCanvasInputUpdate(props, childProps)}
      plotRect={props.rootProps.plotRect}
      renderLayers={props.renderLayers}
      theme={props.rootProps.theme}
      width={props.rootProps.width}
    />
  </Block>
)

_ChartRender.propTypes = {
  onUpdate: PropTypes.func,
  renderLayers: PropTypes.array,
  rootProps: PropTypes.object,
  theme: PropTypes.object,
}
_ChartRender.defaultProps = {
  theme: DEFAULT_THEME,
}

export const ChartRender = stateHOC(_ChartRender)
