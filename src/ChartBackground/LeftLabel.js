// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {THEME} from '../defaults'

// component that positions and styles the left label of the `Chart` component
export default function LeftLabel(props) {
  const style = {
    fontSize: props.theme.axisLabelFontSize,
    fontWeight: props.theme.axisLabelFontWeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    top: props.plotRect.y,
    transform: 'translate(-100%) rotate(-90deg)',
    transformOrigin: '100% 0',
    whiteSpace: 'nowrap',
    width: props.plotRect.height,
  }
  return <div style={style}>{props.text}</div>
}

LeftLabel.propTypes = {
  plotRect: PropTypes.object,
  text: PropTypes.string,
  theme: PropTypes.object,
}

LeftLabel.defaultProps = {
  plotRect: {x: 0, y: 0, width: 0, height: 0},
  text: '',
  theme: THEME,
}
