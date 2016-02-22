/* eslint react/prop-types:0 */

export const title = 'Dimension Swap'
export const tags = []
export const date = new Date('Feb 3, 2016')
export const description = ''
export code from '!!raw!./'

import React from 'react'

import {map, keys, first} from 'lodash/fp'
import {Table, TableRow, TableCell} from 'react-display'
import {State} from 'on-update'
import {Chart, Points} from '../../../'

const handleSelect = (props, childProps, key) =>
  props.setState({[key]: childProps.target.value})

const Selector = props =>
  <TableRow>
    <TableCell>{props.dimension}</TableCell>
    <TableCell>
      <select
        onChange={childProps => handleSelect(props, childProps, props.dimension)}
        style={{marginLeft: 10}}
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

export const SelectorGroup = props =>
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

const Component = props =>
  <div>
    <SelectorGroup
      {...props}
      data={props.fbData}
      setState={props.setState}
    />
    <Chart>
      <Points
        data={props.fbData}
        fill={props.fill}
        radius={props.radius}
        x={props.x}
        y={props.y}
      />
    </Chart>
  </div>

const startWith = props => {
  props.setState({
    x: 'Date',
    y: 'Adj. Close',
    radius: 'Adj. Volume',
    fill: 'Adj. Open',
  })
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
