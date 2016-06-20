
export const title = 'Scatterplot Zoom'
export const tags = []
export const hide = false
export const date = new Date('Fri Mar 18 2016 13:28:39 GMT-0400 (EDT)')
export const description = 'Example of scatterplot with zoom and highlight.'
export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Brush, Highlight, ScatterplotLabels} from '../../../'
import {State} from 'on-update'
import _ from 'lodash/fp'
import {Block, Row} from 'react-display'
import * as d3Array from 'd3-array'

const filterData = props =>
  _.filter(d => {
    if (!props.xDomain) return true
    const xValue = _.get(props.x, d)
    const yValue = _.get(props.y, d)
    return xValue >= props.xDomain[0] && xValue <= props.xDomain[1] && yValue >= props.yDomain[1] && yValue <= props.yDomain[0]
  }, props.data)

const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
    yDomain: childProps.yDomain,
  })
}

const handleClose = (props) => {
  props.setState({showMap: !props.showMap})
}

const MainChart = (props) =>
  <Block flex={1}>
    <Highlight
      Component={Points}
      componentProps={{
        x: props.x,
        y: props.y,
        radiusValue: 4,
        alphaValue: 1,
      }}
    >
      <Chart
        groupedKeys={['x', 'y']}
        proportion={0.7}
        xDomain={props.xDomain}
        yDomain={[props.yDomain[1], props.yDomain[0]]}
        xType='linear'
        yType='linear'
      >
        <Points
          skipExtractArrays
          data={filterData(props)}
          x={props.x}
          y={props.y}
          radiusValue={3}
        />
        {!props.mouseDown ? <ScatterplotLabels
          skipExtractArrays
          data={filterData(props)}
          x={props.x}
          y={props.y}
          text='Name'
        /> : null}
      </Chart>
    </Highlight>
  </Block>

const handleBrushMouseDown = (props) => {
  props.setState({mouseDown: true})
}

const handleBrushMouseUp = (props) => {
  props.setState({mouseDown: false})
}

const getLayout = (props) => {
  if (props.showMap) {
    return (
      <Row flex={1}>
        <MainChart {...props} />
        <Block
          width={150}
          marginLeft={5}
        >
          <Brush
            onUpdate={childProps => handleUpdate(props, childProps)}
            xDomain={props.xDomain}
            yDomain={props.yDomain}
            onMouseUp={() => handleBrushMouseUp(props)}
            onMouseDown={() => handleBrushMouseDown(props)}
          >
            <Chart
              proportion={1}
              yShowLabel={false}
              xShowLabel={false}
              backgroundOffset={5}
            >
              <Points
                data={props.data}
                x={props.x}
                y={props.y}
                fillValue='gray'
                radiusValue={2}
              />
            </Chart>
          </Brush>
        </Block>
      </Row>
    )
  }
  return <MainChart {...props} />
}

export const Component = (props) =>
  <Row
    position='relative'
  >
    {getLayout(props)}
    <Block
      position='absolute'
      top={-25}
      right={0}
      cursor='pointer'
      onClick={() => handleClose(props)}
      fontSize={13}
    >
      {props.showMap ? 'close map' : 'show map'}
    </Block>
  </Row>

export const DataVis = props =>
  <State>
    <Component
      {...props}
      xDomain={d3Array.extent(_.slice(20, 60, props.fbData), d => d.Volume)}
      yDomain={d3Array.extent(_.slice(20, 60, props.fbData), d => d['Adj. Close']).reverse()}
      data={_.slice(20, 60, props.fbData)}
      x='Volume'
      y='Adj. Close'
      showMap={true}
    />
  </State>
