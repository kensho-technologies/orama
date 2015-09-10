
import React, {PropTypes} from 'react'
import R from 'ramda'

import Chart from '../Chart'
import DataList from '../DataList'
import MapData from '../MapData'

var styles = {
  visContainer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    display: 'flex',
  },
  chartWrapper: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    flex: 1,
  },
}

/**
 * Container component for the `DataList` and map data UI.
 */
export default React.createClass({
  displayName: 'Vis',
  propTypes: {
    data: PropTypes.array,
    styleVars: PropTypes.object,
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
  onPropChange(category, prop) {
    this.setState({
      [`${category}Prop`]: prop,
    })
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
            margin={{left: 70, right: 20, top: 20, bottom: 60}}
            size={{width: 300, height: 300}}
            styleVars={this.props.styleVars}
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
          margin={{left: 210, right: 20, top: 20, bottom: 60}}
          size={{width: 700, height: 600}}
          styleVars={this.props.styleVars}
          xProp={this.state.xProp}
          yProp={this.state.yProp}
        />
      )
    }
    return (
      <div style={styles.visContainer}>
        <DataList data={this.props.data}/>
        <MapData
          colorProp={this.state.colorProp}
          data={data}
          groupProp={this.state.groupProp}
          setColorProp={this.onColorPropChange}
          setGroupProp={this.onGroupPropChange}
          setProp={this.onPropChange}
          setXProp={this.onXPropChange}
          setYProp={this.onYPropChange}
          xProp={this.state.xProp}
          yProp={this.state.yProp}
        />
        <div style={styles.chartWrapper}>
          {chartElements}
        </div>
      </div>
    )
  },
})
