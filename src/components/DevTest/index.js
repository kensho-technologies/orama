
import React from 'react'
import R from 'ramda'

import ChartRender from '../ChartRender'

import utils from '../../utils'

const renderData = R.map(() => {
  const path2D = utils.path()
  path2D.arc(Math.random() * 350 + 50, Math.random() * 350 + 50, 5, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
  }
}, R.range(1, 2000))
const renderTextData = [
  {
    text: 'TEXT',
    textAlign: 'left',
    x: 200,
    y: '50%',
  },
]
const defaultProps = {
  size: {width: 500, height: 500},
  plotRect: {x: 50, y: 50, width: 400, height: 400},
  renderData,
  renderTextData,
}

export default React.createClass({
  displayName: 'devTest',
  propTypes: {
  },
  getDefaultProps() {
    return {
    }
  },
  getInitialState() {
    return {}
  },
  handleUpdate(props) {
    this.setState({elementProps: props})
  },
  render() {
    const elementProps = this.state.elementProps || defaultProps
    return (
      <ChartRender
        {...elementProps}
        onUpdate={this.handleUpdate}
      />
    )
  },
})
