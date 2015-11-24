
import React, {PropTypes} from 'react'

import {Flex} from 'react-display'
import ChartsGroupBar from '../ChartsGroupBar'
import DataList from '../DataList'
import MapData from '../MapData'

import Chart2 from '../Chart2'

/**
 * Container component for the `DataList` and map data UI.
 */
export default React.createClass({
  displayName: 'Vis',
  propTypes: {
    data: PropTypes.array,
    theme: PropTypes.object,
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
    return (
      <Flex // vis container
        alignContent='stretch'
        alignItems='stretch'
        background={'white'}
        bottom={0}
        left={0}
        position={'fixed'}
        right={0}
        top={0}
      >
        <DataList data={this.props.data}/>
        <MapData
          colorProp={this.state.colorProp}
          data={this.props.data}
          groupProp={this.state.groupProp}
          radiusProp={this.state.radiusProp}
          setColorProp={this.onColorPropChange}
          setGroupProp={this.onGroupPropChange}
          setProp={this.onPropChange}
          setXProp={this.onXPropChange}
          setYProp={this.onYPropChange}
          xProp={this.state.xProp}
          yProp={this.state.yProp}
        />
        <ChartsGroupBar>
          <Chart2
            color={this.state.colorProp}
            data={this.props.data}
            radius={this.state.radiusProp}
            x={this.state.xProp}
            y={this.state.yProp}
          />
        </ChartsGroupBar>
      </Flex>
    )
  },
})
