
export const title = 'Scatterplot Zoom'
export const tags = []
export const hide = false
export const date = new Date('Fri Mar 18 2016 13:28:39 GMT-0400 (EDT)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Brush, Highlight} from '../../../'
import {State} from 'on-update'
import _ from 'lodash/fp'
import {Block, Row} from 'react-display'

const filterData = props =>
  _.filter(d => {
    if (!props.xDomain) return true
    const xValue = _.get(props.x, d)
    const yValue = _.get(props.y, d)
    return xValue > props.xDomain[0] && xValue < props.xDomain[1] && yValue > props.yDomain[1] && yValue < props.yDomain[0]
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
      </Chart>
    </Highlight>
  </Block>

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
          >
            <Chart
              proportion={1}
              yShowLabel={false}
              xShowLabel={false}
              backgroundOffset={0}
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
const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component
      {...props}
      xDomain={[10000000, 100000000]}
      yDomain={[100, 50]}
      data={_.filter(d => d.Volume < 200000000, props.fbData)}
      x='Volume'
      y='Adj. Close'
      showMap={true}
    />
  </State>
