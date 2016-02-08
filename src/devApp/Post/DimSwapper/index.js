
import React, {PropTypes} from 'react'

import {State} from 'on-update'
import {TextBody} from '../../basics/TextBody'
import {H1, Code} from '../../basics'
import {Chart, Points} from '../../../index'
import {DimSwapperSelectorGroup} from '../../Post/DimSwapperSelectorGroup'

const startWith = async props => {
  props.setState({
    x: 'Date',
    y: 'Adj. Close',
    radius: 'Adj. Volume',
    fill: 'Adj. Open',
  })
}

const snippet = `

const MyChart = () =>
  <State startWith={startWith}>
    <InnerMyChart/>
  </State>


const startWith = async props =>
  props.setState({
    data: await fetch(url).then(r => r.json())
  })

const InnerMyChart = props =>
  <div>
    <SelectorGroup {...props}/>
    <Chart>
      <Points
        data={props.data}
        x={props.x}
        y={props.y}
        radius={props.radius}
        fill={props.fill}
      />
    </Chart>
  </div>

const SelectorGroup = props =>
  <div>
    {map(
      d => <Selector {...props} key={d} dimension={d}/>,
      ['x', 'y', 'radius', 'fill']
    )}
  </div>

const Selector = props =>
  <div>
    {props.dimension}
    <select
      onChange={childProps =>
        handleSelect(props, childProps, props.dimension)
      }
      value={props[props.dimension]}
    >
      {map(
        d => <option key={d} value={d}>{d}</option>,
        keys(first(props.data))
      )}
    </select>
  </div>

const handleSelect = (props, childProps, dim) =>
  props.setState({[dim]: childProps.target.value})`

const InnerPost = props =>
  <TextBody>
    <H1>Scatterplot with dimension swapper</H1>
    <DimSwapperSelectorGroup
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
    <Code>{snippet}</Code>
  </TextBody>

InnerPost.propTypes = {
  fbData: PropTypes.array,
  fill: PropTypes.string,
  radius: PropTypes.string,
  setState: PropTypes.func,
  x: PropTypes.string,
  y: PropTypes.string,
}
InnerPost.defaultProps = {
}

export const DimSwapper = props => (
  <State startWith={startWith}>
    <InnerPost {...props}/>
  </State>
)
