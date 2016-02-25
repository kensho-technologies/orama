/* eslint react/prop-types:0 */
/* eslint-disable */

import _ from 'lodash'
export const title = 'Layout'
export const hide = true
export const tags = []
export const date = new Date('Feb 9, 2016')
export const description = ``
export code from '!!raw!./'

import React from 'react'
import {Row, Block, TableRow} from 'react-display'

const Table = (props) =>
  <table style={props}>
    <tbody>{props.children}</tbody>
  </table>

const TableCell = (props) =>
  <td style={props}>
    {props.children}
  </td>

export const DataVis = () =>
  <div>
    <Block>
      <Row>
        <Block background='steelblue' margin='10' maxWidth='100'>Test Test Test Test Test Test</Block>
        <Block background='steelblue' margin='10'>
          <Block position='relative' background='red' top='50'>
            Text text
          </Block>
        </Block>
        <Block background='steelblue' margin='10' flex='1'>Test</Block>
        <Block background='steelblue' margin='10' width='70'>Test</Block>
      </Row>
      <Block background='steelblue' margin='10'>Middle Title</Block>
      <Row>
        <Block background='steelblue' margin='10' width='70'>Test</Block>
        <Block background='steelblue' margin='10' flex='1'>Test</Block>
        <Block background='steelblue' margin='10' flex='1'>Test</Block>
        <Block background='steelblue' margin='10' width='70'></Block>
      </Row>
      <Row>
        <Block background='steelblue' margin='10' width='70'>Test</Block>
        <Block background='steelblue' margin='10' flex='1'>Test</Block>
        <Block background='steelblue' margin='10' flex='1'>Test</Block>
        <Block background='steelblue' margin='10' width='70'></Block>
      </Row>
    </Block>
    <Block height='100'/>
    <Table width='100%' borderSpacing='1'>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell>
          {/*Title*/}
        </TableCell>
        <TableCell>
          {/*Title*/}
        </TableCell>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell background='steelblue'>
          {/*<Block
            background='red'
            position='relative' transform='rotate(-90deg)'
            width='50'
          >
            LABEL TEXT
          </Block>*/}
        </TableCell>
        <TableCell>
          {/*<Block background='blue' width='20' height='100'/>*/}
        </TableCell>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell background='steelblue'/>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <td style={{background: 'yellow', padding: 10}} colSpan='2'>
          Title
        </td>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell>
          {/*Title*/}
        </TableCell>
        <TableCell>
          {/*Title*/}
        </TableCell>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell background='steelblue' height='100'>
          {/*<Block background='steelblue' height='100' margin='10'/>*/}
        </TableCell>
        <TableCell>
          {/*<Block background='blue' height='100' margin='10'/>*/}
        </TableCell>
        <TableCell background='lightgray'/>
      </tr>
      <tr>
        <TableCell background='lightgray'/>
        <TableCell background='steelblue' height='100'/>
        <TableCell background='lightgray'/>
      </tr>
    </Table>
  </div>
