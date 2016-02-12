/* eslint react/prop-types:0 */

export const title = 'CSS Layout'
export const hide = true
export const tags = []
export const date = new Date('Feb 9, 2016')
export const description = `Test for simulating flex layout inside of canvas`
export code from '!!raw!./'

import React from 'react'
import {Row, Block, Column} from 'react-display'
import computeLayout from 'css-layout'

export const DataVis = () =>
  <div>

    <Row alignItems='stretch'>
      <Block
        background='steelblue' flex={1}
        //height='100%'
        margin={10} paddingLeft={100}
        paddingTop={30}
        position='relative'
      >
        <Block background='lightblue' height='100%' width='100%' position='absolute'>
        </Block>
      </Block>
      <Block
        background='steelblue' flex={1} height={100}
        margin={10}
      >
        <Block background='lightblue' flex={1} height='100%' />
      </Block>
      <Block
        background='steelblue' flex={1} height={100}
        margin={10}
        paddingTop={60}
      >
        <Block background='lightblue' flex={1} height='100%' />
      </Block>
    </Row>

    <Row alignItems='flex-start'>
      <Block
        background='steelblue' flex={1} height={100}
        margin={10} paddingLeft={100}
      >
        <Block background='lightblue' flex={1} height='100%'/>
      </Block>
      <Block
        background='steelblue' flex={1} height={100}
        margin={10}
        paddingBottom={20}
      >
        <Block background='lightblue' flex={1} height='100%'/>
      </Block>
      <Block
        background='steelblue' flex={1} height={100}
        margin={10}
      >
        <Block background='lightblue' flex={1} height='100%'/>
      </Block>
    </Row>

  </div>

  var nodeTree = {
      style: {
        width: 800,
        height: 800,
        padding: 50,
        flexDirection: 'row',
      },
      children: [
        {
          style: {
            padding: 10,
            flex: 1,
            height: '100%',
          }
        },
        {
          style: {
            paddingLeft: 100,
            flex: 1,
            height: '100%',
          }
        }
      ]
    };

  // compute the layout
  computeLayout(nodeTree, 1000)

  // console.log(nodeTree.children[0].layout)
