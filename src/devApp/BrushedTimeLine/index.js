
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {State} from 'on-update'
import {Chart, Brush, Lines} from '../../'

const LINES_OPTS = {
  stroke: 'Name',
  title: 'Name',
  x: 'Date',
  y: 'Adj Close',
}

const filterData = props =>
  _.filter(props.data, d => {
    if (!props.xDomain) return true
    return d.Date > props.xDomain[0] && d.Date < props.xDomain[1]
  })

const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
  })
}

const InnerBrushTimeLine = props =>
  <div>
    <Chart
      proportion={0.3}
      xDomain={props.xDomain}
      xShowLabel={false}
    >
      <Lines
        {...LINES_OPTS}
        data={filterData(props)}
      />
    </Chart>
    <Brush
      onUpdate={childProps => handleUpdate(props, childProps)}
      xDomain={props.xDomain}
    >
      <Chart
        proportion={0.1}
      >
        <Lines
          {...LINES_OPTS}
          data={props.data}
          showHover={false}
        />
      </Chart>
    </Brush>
  </div>
InnerBrushTimeLine.defaultProps = {
  data: [],
}
InnerBrushTimeLine.propTypes = {
  data: PropTypes.array,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
}

export const BrushedTimeLine = props =>
  <State {...props}>
    <InnerBrushTimeLine/>
  </State>
