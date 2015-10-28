
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '@luiscarli/display'
import CanvasInput from '../CanvasInput2'
import CanvasRender from '../CanvasRender'
import CanvasRenderHover from '../CanvasRenderHover'
import CanvasRenderHighlight from '../CanvasRenderHighlight'
import RenderAnnotation from '../RenderAnnotation'
import TooltipContainer from '../TooltipContainer'

import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'
import utils from '../../utils'

const handleCanvasInputHover = (props, hoverData, mouse) => {
  const renderHoverData = hoverData ? [hoverData] : undefined
  props.onUpdate('renderHoverData', renderHoverData)
  props.onUpdate('mouse', mouse)
}

const handleCanvasInputClick = (props, selectedData, mouse) => {
  const renderSelectedData = selectedData ? [selectedData] : undefined
  props.onUpdate('renderSelectedData', renderSelectedData)
  props.onUpdate('mouse', mouse)
}

const handleAnnotationClick = (props, selectedTextData) => {
  props.onUpdate('renderSelectedData', [selectedTextData])
}

const ChartRender = props => (
  <Block // canvas wrapper
    height={props.size.height}
    position={'relative'}
    width={props.size.width}
  >
    <CanvasRender
      plotRect={props.plotRect}
      renderData={props.renderData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHighlight
      data={props.renderHighlightData}
      plotRect={props.plotRect}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHover
      plotRect={props.plotRect}
      renderHoverData={props.renderHoverData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasInput
      onClick={handleCanvasInputClick.bind(null, props)}
      onHover={handleCanvasInputHover.bind(null, props)}
      renderData={props.renderData}
      size={props.size}
    />
    <RenderAnnotation
      onClick={handleAnnotationClick.bind(null, props)}
      renderTextData={props.renderTextData}
      size={props.size}
      theme={props.theme}
    />
    <TooltipContainer
      renderSelectedData={props.renderSelectedData}
    />
  </Block>
)

ChartRender.propTypes = {
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderData: PropTypes.array,
  renderHighlightData: PropTypes.array,
  renderHoverData: PropTypes.array,
  renderTextData: PropTypes.array,
  size: PropTypes.object,
  textData: PropTypes.array,
  theme: PropTypes.object,
}

ChartRender.defaultProps = {
  theme: defaultTheme,
}

// defaultProps for test
import TooltipTextItem from '../TooltipTextItem'
const renderData = R.map(() => {
  const path2D = utils.path()
  path2D.arc(Math.random() * 350 + 50, Math.random() * 350 + 50, 5, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
  }
}, R.range(1, 1000))
const renderTextData = [
  {
    type: 'text',
    text: 'ANNOTATION',
    textAlign: 'left',
    x: 200,
    y: 200,
    tooltipComponent: TooltipTextItem,
  },
]
const defaultProps = {
  size: {width: 500, height: 500},
  plotRect: {x: 50, y: 50, width: 400, height: 400},
  renderData,
  renderTextData,
}

export default stateHOC(ChartRender, defaultProps)
