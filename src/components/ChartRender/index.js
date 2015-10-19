
import React, {PropTypes} from 'react'

import {Block} from '../Display'
import CanvasInput from '../CanvasInput'
import CanvasRender from '../CanvasRender'
import CanvasRenderHover from '../CanvasRenderHover'
import CanvasRenderSelection from '../CanvasRenderSelection'

import defaultTheme from '../defaultTheme'

export default React.createClass({
  displayName: 'ChartRender',
  propTypes: {
    handleUpdate: PropTypes.func,
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    renderHoverData: PropTypes.array,
    selection: PropTypes.array,
    size: PropTypes.object,
    textData: PropTypes.array,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      theme: {...defaultTheme},
    }
  },
  handleHover(hoverData, mouse) {
    const renderHoverData = hoverData ? [hoverData] : undefined
    this.props.handleUpdate({
      ...this.props,
      renderHoverData,
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
          renderSelectionData={this.props.renderHoverData}
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
          handleHover={this.handleHover}
          renderData={this.props.renderData}
          size={this.props.size}
          theme={this.props.theme}
        />
      </Block>
    )
  },
})
