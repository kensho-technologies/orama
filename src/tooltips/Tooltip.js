// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import extractTooltipData from './extractTooltipData'

const MAX_WIDTH = 320

const getPadding = theme => theme.tooltipFontSize / 2

class TooltipInner extends React.Component {
  static propTypes = {
    showKeys: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    title: PropTypes.string,
    values: PropTypes.array,
  }

  static defaultProps = {
    showKeys: false,
  }

  renderRow = (d, i) => {
    const {showKeys, theme} = this.props
    const padding = getPadding(theme)
    const style = {
      background: i % 2 ? theme.tooltipBackgroundFill : theme.tooltipEvenBackgroundFill,
    }
    const keyStyle = {borderRight: `2px solid ${theme.tooltipKeyBorderStroke}`, padding}
    const nameStyle = {padding, textAlign: 'left', verticalAlign: 'top'}
    const valueStyle = {
      fontFamily: theme.fontFamilyMono,
      fontSize: theme.tooltipValueFontSize,
      padding,
      textAlign: 'right',
      verticalAlign: 'top',
    }
    return (
      <tr style={style} key={i}>
        {!!showKeys && <td style={keyStyle}>{d.key}</td>}
        <td style={nameStyle}>{d.name}</td>
        <td style={valueStyle}>{d.value}</td>
      </tr>
    )
  }

  render() {
    const {title, theme, values} = this.props
    const style = {
      background: theme.tooltipBackgroundFill,
      boxShadow: `1px 1px 1px ${theme.tooltipBoxShadowFill}`,
      color: theme.tooltipTextFill,
      fontFamily: theme.fontFamily,
      fontSize: theme.tooltipFontSize,
      maxWidth: MAX_WIDTH,
      opacity: 0.96,
    }
    const titleStyle = {
      fontSize: theme.tooltipTitleFontSize,
      fontWeight: theme.tooltipTitleFontWeight,
      padding: getPadding(theme),
      textAlign: 'left',
      verticalAlign: 'top',
    }
    return (
      <div style={style}>
        {!!title && <div style={titleStyle}>{title}</div>}
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>{map(values, this.renderRow)}</tbody>
        </table>
      </div>
    )
  }
}

export default function Tooltip(props) {
  const {hoverData, layerProps, theme} = props
  const tooltipData = extractTooltipData(layerProps, hoverData)
  return <TooltipInner showKeys={layerProps.tooltipShowKeys} theme={theme} {...tooltipData} />
}

Tooltip.propTypes = {
  hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  layerProps: PropTypes.object,
  theme: PropTypes.object,
}
