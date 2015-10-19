
import React from 'react'
import R from 'ramda'

import ChartRender from '../ChartRender'
import {Flex} from '../Display'

import utils from '../../utils'

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
    const renderData = R.map(() => {
      const path2D = utils.path()
      path2D.arc(Math.random() * 350 + 50, Math.random() * 350 + 50, 5, 0, 2 * Math.PI)
      return {
        type: 'area',
        path2D,
      }
    }, R.range(1, 200))
    const rect = utils.path()
    rect.rect(10, 50, 200, 400)
    const rect2 = utils.path()
    rect2.rect(210, 210, 50, 50)
    const defaultProps = {
      size: {width: 500, height: 500},
      plotRect: {x: 50, y: 50, width: 400, height: 400},
      renderData,
    }
    const elementProps = this.state.elementProps || defaultProps
    return (
      <Flex flex={1}>
        <ChartRender
          {...elementProps}
          handleUpdate={this.handleUpdate}
        />
      </Flex>
    )
  },
})
