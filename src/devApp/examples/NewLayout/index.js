
/* eslint react/prop-types:0 */

export const title = 'New Layout'
export const tags = []
export const hide = true
export const date = new Date('Thu Feb 25 2016 14:41:42 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines} from '../../../'
import {State} from 'on-update'
import {Table, TableColumn, TableCell} from '../../../layout'
import {Block, Column, Row} from 'react-display'

export const Cell = (props) =>
  <Block background='steelblue' margin='4'
    {...props}
  />

export const DataVis = props =>
  <Table>
    <TableColumn>
      <TableCell flex='0'></TableCell>
      <TableCell>
        Grouped Title
      </TableCell>
      <TableCell></TableCell>
      <TableCell flex='0'></TableCell>
    </TableColumn>
    <TableColumn flex='1'>
      <TableCell flex='0'></TableCell>
      <TableCell>Category 1</TableCell>
      <TableCell>Category 2</TableCell>
      <TableCell flex='0'></TableCell>
    </TableColumn>
    <TableColumn flex='1'>
      <TableCell flex='0'>Left Axis Text oasjd oaskdj aslkdn aosdkn aosdknas daokdijs a</TableCell>
      <TableCell><p>plot</p></TableCell>
      <TableCell><p>plot</p></TableCell>
      <TableCell flex='0'>Right Axis Text</TableCell>
    </TableColumn>
    <TableColumn>
      <TableCell flex='0'></TableCell>
      <TableCell>bottom axis</TableCell>
      <TableCell>bottom axis</TableCell>
      <TableCell flex='0'></TableCell>
    </TableColumn>
  </Table>
