
import React, {PropTypes} from 'react'

import {BrushedTimeline} from '../../Post/BrushedTimeline'
import {TextBody} from '../../basics/TextBody'
import {H1, H2, Code, P} from '../../basics'

const brushedCode = `
const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
    yDomain: childProps.yDomain,
  })
}

const InnerBrushTimeline = props =>
  <div>
    <Chart
      xDomain={props.xDomain}
      xShowLabel={false}
    >
      <Lines
        data={filterData(props)}
        x='x' y='y'
      />
    </Chart>
    <Brush
      onUpdate={childProps => handleUpdate(props, childProps)}
      xDomain={props.xDomain}
    >
      <Chart proportion={0.2}>
        <Lines
          data={props.data}
          x='x' y='y'
        />
      </Chart>
    </Brush>
  </div>

export const BrushTimeline = props =>
  <State {...props}>
    <InnerBrushTimeline/>
  </State>`

export const Post = props =>
  <TextBody>
    <H1>Brush Examples</H1>
    <H2>Brushed line chart</H2>
    <BrushedTimeline data={props.applData}/>
    <P>To the yDomain of the chart to match the extent of the brushed data, filter the data using the xDomain returned by the brush.</P>
    <Code flex={1}>{brushedCode}</Code>
  </TextBody>

Post.propTypes = {
  applData: PropTypes.array,
  fbData: PropTypes.array,
}
