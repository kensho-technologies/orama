// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import {THEME} from './defaults'
import extractTooltipData from './Chart/extractTooltipData'

const MAX_WIDTH = 320

const getPadding = props => props.theme.tooltipFontSize / 2

const row = (props, d, i) => (
  <tr
    style={{
      background: i % 2 ? props.theme.tooltipBackgroundFill : props.theme.tooltipEvenBackgroundFill,
    }}
    key={i}
  >
    {props.showKeys ? (
      <td
        style={{
          borderRight: `2px solid ${props.theme.tooltipKeyBorderStroke}`,
          padding: getPadding(props),
        }}
      >
        {d.key}
      </td>
    ) : null}
    <td // Name
      style={{
        padding: getPadding(props),
        textAlign: 'left',
        verticalAlign: 'top',
      }}
    >
      {d.name}
    </td>
    <td // Value
      style={{
        fontFamily: props.theme.fontFamilyMono,
        fontSize: props.theme.tooltipValueFontSize,
        padding: getPadding(props),
        textAlign: 'right',
        verticalAlign: 'top',
      }}
    >
      {d.value}
    </td>
  </tr>
)

row.propTypes = {
  showKeys: PropTypes.bool,
  theme: PropTypes.object,
}

const TooltipInner = props => (
  <div
    style={{
      background: props.theme.tooltipBackgroundFill,
      boxShadow: `1px 1px 1px ${props.theme.tooltipBoxShadowFill}`,
      color: props.theme.tooltipTextFill,
      fontFamily: props.theme.fontFamily,
      fontSize: props.theme.tooltipFontSize,
      maxWidth: MAX_WIDTH,
      opacity: 0.96,
    }}
  >
    {props.title ? (
      <div
        style={{
          fontSize: props.theme.tooltipTitleFontSize,
          fontWeight: props.theme.tooltipTitleFontWeight,
          padding: getPadding(props),
          textAlign: 'left',
          verticalAlign: 'top',
        }}
      >
        {props.title}
      </div>
    ) : null}
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <tbody>{map(props.values, (d, i) => row(props, d, i))}</tbody>
    </table>
  </div>
)

TooltipInner.propTypes = {
  theme: PropTypes.object,
  title: PropTypes.string,
  values: PropTypes.array,
}

TooltipInner.defaultProps = {
  theme: THEME,
  showKeys: false,
}

export default function Tooltip(props) {
  const tooltipData = extractTooltipData(props.layerProps, props.hoverData)
  return (
    <TooltipInner
      showKeys={props.layerProps.tooltipShowKeys}
      theme={props.theme}
      {...tooltipData}
    />
  )
}

Tooltip.propTypes = {
  hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  layerProps: PropTypes.object,
  theme: PropTypes.object,
}
