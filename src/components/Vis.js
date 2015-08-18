
import React, {PropTypes} from 'react'

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
      xProp: '',
      yProp: '',
    }
  },
  onXPropChange(text) {
    this.setState({xProp: text})
  },
  onYPropChange(text) {
    this.setState({yProp: text})
  },
  render() {
    const newDimensions = {
      x: {
        path: [this.state.xProp],
        type: 'linear',
      },
      y: {
        path: [this.state.yProp],
        type: 'linear',
      },
    }
    return (
      <div style={styles.visContainer}>
        <DataList data={this.props.data}/>
        <DropUI
            xProp={this.state.xProp}
            yProp={this.state.yProp}
            setXProp={this.onXPropChange}
            setYProp={this.onYPropChange}
            />
        <Chart
            data={this.props.data}
            dimensions={newDimensions}
            size={{ width: 700, height: 500 }}
            margin={{
              left: 80, right: 30,
              top: 15, bottom: 50,
            }}
            />
      </div>
    )
  },
})
