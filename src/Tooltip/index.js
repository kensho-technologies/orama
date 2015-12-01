
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'

import {Block, Table, TableRow, TableCell} from 'react-display'

const TOOLTIP_MARGIN = 15

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
    <TableCell
      borderRight={getBorder(props, i)}
      padding={10}
    >
      {d.key}
    </TableCell>
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
  theme: PropTypes.object,
}

const Tooltip = props => (
  <Block
    background={props.theme.tooltip.listBackground}
    boxShadow='1px 1px 4px hsla(0, 0%, 0%, 0.8)'
    color='white'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    left={props.lastMousePos.x}
    margin={TOOLTIP_MARGIN}
    maxWidth={320}
    pointerEvents='none'
    position='fixed'
    top={props.lastMousePos.y}
    zIndex='999999'
  >
    <Table>
      {props.tooltipData.title ?
        <TableRow
          background={props.theme.tooltip.listBackground}
        >
          <TableCell/>
          <TableCell // Name
            fontWeight='bold'
            padding={10}
            textAlign='left'
            verticalAlign='top'
          >
            {props.tooltipData.title}
          </TableCell>
          <TableCell/>
        </TableRow>
      : null}
      {_.map(
        props.tooltipData.values,
        (d, i) => row(props, d, i)
      )}
    </Table>
  </Block>
)
Tooltip.propTypes = {
  lastMousePos: PropTypes.object,
  onUpdate: PropTypes.func,
  theme: PropTypes.object,
  tooltipData: PropTypes.object,
}
Tooltip.defaultProps = {
  lastMousePos: {x: 0, y: 0},
  theme: DEFAULT_THEME,
  tooltipData: {},
}

export default stateHOC(Tooltip)
