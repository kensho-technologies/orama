
export const title = 'New Layout'
export const tags = []
export const hide = true
export const date = new Date('Thu Feb 25 2016 14:41:42 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Table, TableColumn, TableCell} from '../../../layout'

export const DataVis = () =>
  <Table>
    <TableColumn>
      <TableCell flex='0'/>
      <TableCell>
        LeftAxis
      </TableCell>
      <TableCell>BiggerLeftAxis</TableCell>
      <TableCell flex='0'/>
    </TableColumn>
    <TableColumn flex='1'>
      <TableCell flex='0'/>
      <TableCell>Plot1</TableCell>
      <TableCell>Plot3</TableCell>
      <TableCell flex='0'/>
    </TableColumn>
    <TableColumn flex='1'>
      <TableCell flex='0'>Sub title on top of second plot column, it has text enough to wrap in itself</TableCell>
      <TableCell>Plot2</TableCell>
      <TableCell>Plot4</TableCell>
      <TableCell flex='0'>BottomAxis</TableCell>
    </TableColumn>
    <TableColumn>
      <TableCell flex='0'/>
      <TableCell>RightAxis</TableCell>
      <TableCell>RightAxis</TableCell>
      <TableCell flex='0'/>
    </TableColumn>
  </Table>
