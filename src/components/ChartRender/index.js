
import React, {PropTypes} from 'react'

import {Block} from '../Display'
import CanvasInput from '../CanvasInput'
import CanvasRender from '../CanvasRender'
import CanvasRenderHover from '../CanvasRenderHover'
import CanvasRenderSelection from '../CanvasRenderSelection'
import TextRender from '../TextRender'

import defaultTheme from '../defaultTheme'
import shouldPureComponentUpdate from 'react-pure-render/function'

export default React.createClass({
  displayName: 'ChartRender',
  propTypes: {
    onUpdate: PropTypes.func,
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    renderHoverData: PropTypes.array,
    renderSelectedData: PropTypes.array,
    renderTextData: PropTypes.array,
    size: PropTypes.object,
    textData: PropTypes.array,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      theme: {...defaultTheme},
    }
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  handleCanvasInputHover(hoverData, mouse) {
    const renderHoverData = hoverData ? [hoverData] : undefined
    this.props.onUpdate({
      ...this.props,
      renderHoverData,
      mouse,
    })
  },
  handleCanvasInputClick(selectedData, mouse) {
    const renderSelectedData = selectedData ? [selectedData] : undefined
    this.props.onUpdate({
      ...this.props,
      renderSelectedData,
      mouse,
    })
  },
  render() {
    return (
      <Block // canvas wrapper
        height={this.props.size.height}
        position={'relative'}
        width={this.props.size.width}
      >
        <CanvasRender
          plotRect={this.props.plotRect}
          renderData={this.props.renderData}
          size={this.props.size}
          theme={this.props.theme}
        />
        <CanvasRenderSelection
          plotRect={this.props.plotRect}
          renderSelectionData={this.props.renderSelectedData}
          size={this.props.size}
          theme={this.props.theme}
        />
        <CanvasRenderHover
          plotRect={this.props.plotRect}
          renderHoverData={this.props.renderHoverData}
          size={this.props.size}
          theme={this.props.theme}
        />
        <CanvasInput
          onClick={this.handleCanvasInputClick}
          onHover={this.handleCanvasInputHover}
          renderData={this.props.renderData}
          size={this.props.size}
        />
        <TextRender
          renderTextData={this.props.renderTextData}
          size={this.props.size}
          theme={this.props.theme}
        />
      </Block>
    )
  },
})
