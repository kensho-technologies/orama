// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {THEME} from '../defaults'

// component that positions and styles the bottom label of the `Chart` component
export default function BottomLabel(props) {
  const style = {
    bottom: 0,
    fontSize: props.theme.axisLabelFontSize,
    fontWeight: props.theme.axisLabelFontWeight,
    left: props.plotRect.x,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: props.plotRect.width,
  }
  return <div style={style}>{props.text}</div>
}

BottomLabel.propTypes = {
  plotRect: PropTypes.object,
  text: PropTypes.string,
  theme: PropTypes.object,
}

BottomLabel.defaultProps = {
  plotRect: {x: 0, y: 0, width: 0, height: 0},
  text: '',
  theme: THEME,
}
