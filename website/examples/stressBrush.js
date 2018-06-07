import * as React from 'react'

import {Areas, Brush, Chart, Lines, Points} from 'orama'

import getRandomTimeseries from '../helpers/getRandomTimeseries' // eslint-disable-line import/order

const data = getRandomTimeseries(5000)

class StressBrush extends React.Component {
  state = {
    xDomain: [data[4900].date, data[4999].date],
  }

  handleBrush = ({xDomain}) => this.setState({xDomain})

  render() {
    const {xDomain} = this.state
    const selectedData = xDomain
      ? data.filter(d => d.date >= xDomain[0] && d.date <= xDomain[1])
      : data
    return (
      <React.Fragment>
        <Chart height={224}>
          <Lines data={selectedData} x="date" y="value" strokeValue="steelblue" interpolate />
          <Points data={selectedData} x="date" y="value" fillValue="steelblue" />
        </Chart>
        <Brush onUpdate={this.handleBrush} xDomain={xDomain} fillAlphaValue={0.2}>
          <Chart
            xShowLabel={false}
            yShowTicks={false}
            proportion={0.06}
            yName=" "
            xShowGuides={false}
            yShowGuides={false}
            x1Name="Start Date"
            x2Name="End Date"
          >
            <Areas data={data} alphaValue={0.3} showHover={false} x="date" />
            <Lines data={data} lineWidthValue={1} showHover={false} x="date" y="value" />
          </Chart>
        </Brush>
      </React.Fragment>
    )
  }
}

export default <StressBrush />
