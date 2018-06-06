// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

// component that positions and styles the left label of the `Chart` component
export default function LeftLabel(props) {
  const {plotRect, text, theme} = props
  const style = {
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    top: plotRect.y,
    transform: 'translate(-100%) rotate(-90deg)',
    transformOrigin: '100% 0',
    whiteSpace: 'nowrap',
    width: plotRect.height,
  }
  return <div style={style}>{text}</div>
}

LeftLabel.propTypes = {
  plotRect: PropTypes.object.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object.isRequired,
}
