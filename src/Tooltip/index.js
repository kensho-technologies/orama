
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {Table, TableRow, TableCell} from 'react-display'

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

export const Tooltip = props => (
  <Table
    background={props.theme.tooltip.listBackground}
    boxShadow='1px 1px 4px hsla(0, 0%, 0%, 0.8)'
    color='white'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    maxWidth={MAX_WIDTH}
  >
    {props.title ?
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
Tooltip.propTypes = {
  mouse: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string,
  values: PropTypes.array,
}
Tooltip.defaultProps = {
  theme: DEFAULT_THEME,
}
