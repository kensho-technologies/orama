import * as React from 'react'

import {Chart, Bars, Brush} from 'orama'

const data = [
  {type: 'type 1', value: 10},
  {type: 'type 2', value: 20},
  {type: 'type 3', value: -7},
  {type: 'type 4', value: 3},
  {type: 'type 5', value: 12},
]

export default class BrushExample extends React.Component {
  state = {
    xDomain: ['type 2', 'type 4'],
  }

  handleBrushUpdate = ({xDomain}) => this.setState({xDomain})

  render() {
    return (
      <Brush xDomain={this.state.xDomain} onUpdate={this.handleBrushUpdate}>
        <Chart yZeroBased>
          <Bars data={data} x="type" y="value" />
        </Chart>
      </Brush>
    )
  }
}
