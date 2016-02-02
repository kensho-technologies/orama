
import React, {PropTypes} from 'react'

import {BrushedTimeline} from '../../BrushedTimeline'
import {TextBody} from '../../basics/TextBody'
import {H1, H2, Code} from '../../basics'
import {Chart} from '../../../Chart'
import {Lines} from '../../../Layer'

export const Examples = props => (
<TextBody>
<H1>Base Examples</H1>
<H2>Multi line chart</H2>
<Chart>
  <Lines
    data={[props.applData, props.fbData]}
    title='Name'
    stroke='Name'
    x='Date'
    y='Adj. Close'
  />
</Chart>
<Code>
{`<Chart>
  <Lines
    data={[props.applData, props.fbData]}
    title='Name'
    stroke='Name'
    x='Date'
    y='Adj. Close'
  />
</Chart>`}
</Code>
<BrushedTimeline data={props.applData}/>
<Code>
{`<Chart
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
    proportion={0.2}
  >
    <Lines
      {...LINES_OPTS}
      data={props.data}
      showHover={false}
    />
  </Chart>
</Brush>`}
</Code>
</TextBody>
)
Examples.propTypes = {
  applData: PropTypes.array,
  fbData: PropTypes.array,
}
