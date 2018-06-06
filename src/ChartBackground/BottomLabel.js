// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

// component that positions and styles the bottom label of the `Chart` component
export default function BottomLabel(props) {
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

BottomLabel.propTypes = {
  plotRect: PropTypes.object.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object.isRequired,
}
