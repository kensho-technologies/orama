
import React, {PropTypes} from 'react'
import R from 'ramda'

import Chart from './Chart'
import DataList from './DataList'
import DropUI from './DropUI'

var styles = {
  visContainer: {
    margin: 50,
    display: 'flex',
  },
}

export default React.createClass({
  displayName: 'Vis',
  propTypes: {
    data: PropTypes.array,
  },
  getDefaultProps() {
    return {
      data: [],
    }
  },
  getInitialState() {
    return {
      groupProp: '',
      xProp: '',
      yProp: '',
    }
  },
  onGroupPropChange(text) {
    this.setState({groupProp: text})
  },
  onXPropChange(text) {
    this.setState({xProp: text})
  },
  onYPropChange(text) {
    this.setState({yProp: text})
  },
  onColorPropChange(text) {
    this.setState({colorProp: text})
  },
  render() {
    const {data} = this.props
    const {groupProp} = this.state
    let chartElements
    if (groupProp) {
      const pairs = R.toPairs(R.groupBy(R.prop(groupProp), data))
      chartElements = R.map(d => {
        if (d[1].length < 2) return undefined
        if (d[0] === '0') return undefined
        return (
          <Chart
              colorProp={this.state.colorProp}
              data={d[1]}
              key={d[0]}
              title={d[0]}
              xProp={this.state.xProp}
              yProp={this.state.yProp}
              />
        )
      }, pairs)
    } else {
      chartElements = (
        <Chart
            colorProp={this.state.colorProp}
            data={this.props.data}
            xProp={this.state.xProp}
            yProp={this.state.yProp}
            />
      )
    }
    return (
      <div style={styles.visContainer}>
        <DataList data={this.props.data}/>
        <DropUI
            colorProp={this.state.colorProp}
            groupProp={this.state.groupProp}
            setColorProp={this.onColorPropChange}
            setGroupProp={this.onGroupPropChange}
            setXProp={this.onXPropChange}
            setYProp={this.onYPropChange}
            xProp={this.state.xProp}
            yProp={this.state.yProp}
            />
        <div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
          {chartElements}
        </div>
      </div>
    )
  },
})
