
import React, {PropTypes} from 'react'

import Chart2 from './Chart2'
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
    return (
      <div style={styles.visContainer}>
        <DataList data={this.props.data}/>
        <DropUI
            xProp={this.state.xProp}
            yProp={this.state.yProp}
            setXProp={this.onXPropChange}
            setYProp={this.onYPropChange}
            />
        <div>
          <Chart2
              data={this.props.data}
              xProp={this.state.xProp}
              yProp={this.state.yProp}
              />
        </div>
      </div>
    )
  },
})
