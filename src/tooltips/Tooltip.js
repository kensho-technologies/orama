// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import * as CustomPropTypes from '../CustomPropTypes'

import extractTooltipData from './extractTooltipData'

const getPadding = theme => theme.tooltipFontSize / 2

export default class Tooltip extends React.PureComponent {
  static propTypes = {
    hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    layerProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    onMeasure: PropTypes.func.isRequired,
    theme: CustomPropTypes.theme.isRequired,
  }

  divRef = React.createRef()

  componentDidMount() {
    this.measure()
  }

  componentDidUpdate() {
    this.measure()
  }

  measure() {
    if (!this.divRef.current) return
    const {onMeasure} = this.props
    const {offsetHeight: height, offsetWidth: width} = this.divRef.current
    onMeasure(height, width)
  }

  renderRow = (d, i) => {
    const {layerProps, theme} = this.props
    const showKeys = !!layerProps.tooltipShowKeys
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
    const {hoverData, layerProps, theme} = this.props
    const {title, values} = extractTooltipData(layerProps, hoverData)
    const style = {
      background: theme.tooltipBackgroundFill,
      boxShadow: `1px 1px 1px ${theme.tooltipBoxShadowFill}`,
      color: theme.tooltipTextFill,
      fontFamily: theme.fontFamily,
      fontSize: theme.tooltipFontSize,
      maxWidth: 320,
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
      <div ref={this.divRef} style={style}>
        {!!title && <div style={titleStyle}>{title}</div>}
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>{map(values, this.renderRow)}</tbody>
        </table>
      </div>
    )
  }
}
