
import React, {PropTypes} from 'react'

import {State} from '../../State'
import {TextBody} from '../../basics/TextBody'
import {H1} from '../../basics'
import {Chart, Points} from '../../../index'
import {FetchTestSelect} from '../../Post/FetchTestSelect'

const startWith = async props => {
  props.setState({
    x: 'Adj. Open',
    y: 'Volume',
  })
}

const InnerPost = props =>
  <TextBody>
    <H1>Fetch tester</H1>
    <FetchTestSelect {...props}/>
    <Chart>
      <Points
        data={props.applData}
        x={props.x}
        y={props.y}
      />
    </Chart>
  </TextBody>

InnerPost.propTypes = {
  applData: PropTypes.array,
  x: PropTypes.string,
  y: PropTypes.string,
}
InnerPost.defaultProps = {
}

export const FetchTest = props => (
  <State startWith={startWith}>
    <InnerPost {...props}/>
  </State>
)
