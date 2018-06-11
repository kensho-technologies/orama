// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'

// component that positions and styles the bottom label of the `Chart` component
export default function LabelBottom(props) {
  const {plotRect, text, theme} = props
  const style = {
    bottom: 0,
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: plotRect.x,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: plotRect.width,
  }
  return <div style={style}>{text}</div>
}

LabelBottom.propTypes = {
  plotRect: CustomPropTypes.plotRect.isRequired,
  text: PropTypes.string,
  theme: CustomPropTypes.theme.isRequired,
}
