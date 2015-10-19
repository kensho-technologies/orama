
import React, {PropTypes} from 'react'

import {Block} from '../Display'
import CanvasInput from '../CanvasInput'
import CanvasRender from '../CanvasRender'

// import defaultTheme from '../defaultTheme'

export default React.createClass({
  displayName: 'ChartRender',
  propTypes: {
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    selection: PropTypes.array,
    size: PropTypes.object,
    textData: PropTypes.array,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      // theme: {...defaultTheme},
    }
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
        />
        <CanvasInput
          renderData={this.props.renderData}
          size={this.props.size}
        />
      </Block>
    )
  },
})
