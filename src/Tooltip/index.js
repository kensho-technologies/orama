
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {Block, Table, TableRow, TableCell} from 'react-display'
import {extractTooltipData} from '../Chart/extractTooltipData'

const MAX_WIDTH = 320

const getPadding = props => props.theme.tooltipFontSize / 2

const row = (props, d, i) => (
  <TableRow
    background={i % 2 ? props.theme.tooltipBackgroundFill : props.theme.tooltipEvenBackgroundFill}
    key={i}
  >
    {props.showKeys ?
      <TableCell
        borderRight={`2px solid ${props.theme.tooltipKeyBorderStroke}`}
        padding={getPadding(props)}
      >
        {d.key}
      </TableCell>
    : null}
    <TableCell // Name
      padding={getPadding(props)}
      textAlign='left'
      verticalAlign='top'
    >
      {d.name}
    </TableCell>
    <TableCell // Value
      fontFamily={props.theme.fontFamilyMono}
      fontSize={props.theme.tooltipValueFontSize}
      padding={getPadding(props)}
      textAlign='right'
      verticalAlign='top'
    >
      {d.value}
    </TableCell>
  </TableRow>
)
row.propTypes = {
  showKeys: PropTypes.bool,
  theme: PropTypes.object,
}

export const TooltipInner = props => (
  <Block
    background={props.theme.tooltipBackgroundFill}
    boxShadow={`1px 1px 1px ${props.theme.tooltipBoxShadowFill}`}
    color={props.theme.textFill}
    fontFamily={props.theme.fontFamily}
    fontSize={props.theme.tooltipFontSize}
    maxWidth={MAX_WIDTH}
    opacity={0.96}
  >
    {props.title ?
      <Block
        fontSize={props.theme.tooltipTitleFontSize}
        fontWeight={props.theme.tooltipTitleFontWeight}
        padding={getPadding(props)}
        textAlign='left'
        verticalAlign='top'
      >
      {props.title}
      </Block>
    : null}
    <Table
      width='100%'
    >
      {_.map(
        props.values,
        (d, i) => row(props, d, i)
      )}
    </Table>
  </Block>
)
TooltipInner.propTypes = {
  mouse: PropTypes.object,
  showKeys: PropTypes.bool,
  theme: PropTypes.object,
  title: PropTypes.string,
  values: PropTypes.array,
}
TooltipInner.defaultProps = {
  theme: DEFAULT_THEME,
  showKeys: false,
}

export const Tooltip = props => {
  const tooltipData = extractTooltipData(
    props.layerProps,
    props.hoverData,
  )
  return (
    <TooltipInner
      showKeys={props.layerProps.tooltipShowKeys}
      theme={props.theme}
      {...tooltipData}
    />
  )
}
Tooltip.propTypes = {
  hoverData: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  layerProps: PropTypes.object,
  theme: PropTypes.object,
}
