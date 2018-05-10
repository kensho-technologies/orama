// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {DEFAULT_THEME} from '../../defaultTheme'

/**
 * Component that position and style the bottom label of the `Chart` component
 */

export const BottomLabel = props => (
  <div
    style={{
      bottom: 0,
      color: props.theme.textFill,
      fontFamily: props.theme.fontFamily,
      fontSize: props.theme.axisLabelFontSize,
      fontWeight: props.theme.axisLabelFontWeight,
      left: props.plotRect.x,
      overflow: 'hidden',
      position: 'absolute',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: props.plotRect.width,
    }}
  >
    {props.text}
  </div>
)
BottomLabel.propTypes = {
  plotRect: PropTypes.object.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object,
}
BottomLabel.defaultProps = {
  plotRect: {x: 0, y: 0, width: 0, height: 0},
  text: '',
  theme: DEFAULT_THEME,
}
