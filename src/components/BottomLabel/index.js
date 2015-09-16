
import React, {PropTypes} from 'react'

import {Block} from 'jsxstyle'
import defaultTheme from '../defaultTheme'

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'BottomLabel',
  propTypes: {
    plotRect: PropTypes.object.isRequired,
    text: PropTypes.string,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      plotRect: {x: 0, y: 0, width: 0, height: 0},
      text: '',
      theme: {...defaultTheme},
    }
  },
  render() {
    const {plotRect, theme} = this.props

    return (
      <Block
        bottom={0}
        color={theme.axis.color}
        fontFamily={theme.font}
        fontSize={theme.axis.labelFontSize}
        left={plotRect.x}
        overflow={'hidden'}
        position={'absolute'}
        textAlign={'center'}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
        width={plotRect.width}
      >
        {this.props.text}
      </Block>
    )
  },
})
