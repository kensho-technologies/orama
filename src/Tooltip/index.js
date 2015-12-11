
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {Table, TableRow, TableCell} from 'react-display'
import {extractTooltipData} from '../Chart/extractTooltipData'

const MAX_WIDTH = 320

/*
Used inside <ChartRenderWrapper/>
*/
const getBorder = (props, i) => {
  if (i % 2) {
    return `2px solid ${props.theme.tooltip.listEvenBackground}`
  }
  return `2px solid ${props.theme.tooltip.listBackground}`
}

const row = (props, d, i) => (
  <TableRow
    background={i % 2 ? props.theme.tooltip.listBackground : props.theme.tooltip.listEvenBackground}
    key={i}
  >
    {props.showKeys ?
      <TableCell
        borderRight={getBorder(props, i)}
        padding={10}
      >
        {d.key}
      </TableCell>
    : null}
    <TableCell // Name
      padding={10}
      textAlign='left'
      verticalAlign='top'
    >
      {d.name}
    </TableCell>
    <TableCell // Value
      fontFamily={props.theme.fontMono}
      padding={10}
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
  <Table
    background={props.theme.tooltip.listBackground}
    boxShadow='1px 1px 1px hsla(0, 0%, 0%, 0.6)'
    color='white'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    maxWidth={MAX_WIDTH}
  >
    {props.title ?
      <TableRow
        background={props.theme.tooltip.listBackground}
      >
        {props.showKeys ? <TableCell/> : null}
        <TableCell // Name
          fontWeight='bold'
          padding={10}
          textAlign='left'
          verticalAlign='top'
        >
          {props.title}
        </TableCell>
        <TableCell/>
      </TableRow>
    : null}
    {_.map(
      props.values,
      (d, i) => row(props, d, i)
    )}
  </Table>
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
  showKeys: true,
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
