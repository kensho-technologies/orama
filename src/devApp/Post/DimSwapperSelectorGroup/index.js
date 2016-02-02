
import React, {PropTypes} from 'react'
import {map, keys, first} from 'lodash/fp'

import {Table, TableRow, TableCell} from 'react-display'

const handleSelect = (props, childProps, key) =>
  props.setState({[key]: childProps.target.value})

const selectStyle = {marginLeft: 10}

const Selector = props =>
  <TableRow>
    <TableCell>{props.dimension}</TableCell>
    <TableCell>
      <select
        onChange={childProps => handleSelect(props, childProps, props.dimension)}
        style={selectStyle}
        value={props[props.dimension]}
      >
        <option key='none'>--none--</option>
        {map(
          d => <option key={d} value={d}>{d}</option>,
          keys(first(props.data))
        )}
      </select>
    </TableCell>
  </TableRow>
Selector.propTypes = {
  dimension: PropTypes.string,
  data: PropTypes.array,
}

export const DimSwapperSelectorGroup = props =>
  <Table fontSize={15} marginBottom={15}>
    {map(
      d =>
        <Selector
          {...props}
          dimension={d}
          key={d}
        />,
      ['x', 'y', 'radius', 'fill']
    )}
  </Table>
