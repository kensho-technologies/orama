/* eslint react/prop-types:0, no-return-assign:0, no-param-reassign:0 */

export const title = 'Multi Line Highlight'
export const tags = []
export const hide = false
export const date = new Date('Tue Jun 21 2016 13:28:15 GMT-0400 (EDT)')
export const description = `Mouse over the numbers to highlight, click on the numbers or lines to select.

Data is composed of arrays of arrays of objects, each object has x, y and idx. Idx could be substituted by any other naming pattern.

This example does not use the Highlight component, because of the specificity and complexity of the use case. The main logic is extrated from the Highlight component implementation.

The highlight and selection data could be holded by other parent, if other components also participate on the selection.`
export code from '!!raw!./'

import React from 'react'
import _ from 'lodash/fp'
import {timeMonths} from 'd3-time'
import {Chart, Lines, getTimeSeries} from '../../../'

const data = _.map(
  idx => _.each(
    d => d.idx = idx,
    getTimeSeries(timeMonths(new Date(2000, 0), new Date(2020, 0))),
  ),
  _.range(0, 10),
)

export class DataVis extends React.Component {
  state = {
    selectionData: [data[5]],
    highlightData: [],
  }
  handleChartUpdate = (childProps) => {
    if (childProps.action !== 'mouseDown') return
    const {renderDatum} = childProps
    if (!renderDatum) return
    this.updateSelections(renderDatum.data, 'selectionData')
  }
  updateSelections = (d, name) => {
    const localSelection = _.get(name, this.state)
    const index = _.indexOf(d, localSelection)
    if (index > -1) {
      localSelection.splice(index, 1)
      this.setState({
        [name]: [...localSelection],
      })
    } else {
      this.setState({
        [name]: [...localSelection, d],
      })
    }
  }
  render() {
    const selected = _.map(_.get('0.idx'), this.state.selectionData)
    return <div>
      <div>
        {_.map(
          (d) => {
            const idx = _.first(d).idx
            const focus = _.includes(idx, selected)
            return <span
              key={idx}
              onMouseEnter={() => this.updateSelections(d, 'highlightData')}
              onMouseLeave={() => this.updateSelections(d, 'highlightData')}
              onMouseDown={() => this.updateSelections(d, 'selectionData')}
              style={{
                color: focus ? 'red' : 'black',
                cursor: 'pointer',
              }}
            >{idx} </span>
          },
          data,
        )}
      </div>
      <Chart onUpdate={this.handleChartUpdate}>
        <Lines
          data={data}
          x='x' y='y'
        />
        <Lines
          skipExtractArrays={true}
          data={this.state.selectionData}
          x='x' y='y'
          strokeValue='red'
          lineWidthValue={3}
        />
        <Lines
          skipExtractArrays={true}
          data={this.state.highlightData}
          x='x' y='y'
          strokeValue='black'
          lineWidthValue={3}
        />
      </Chart>
    </div>
  }
}
