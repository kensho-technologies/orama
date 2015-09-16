
import React, {PropTypes} from 'react'

import MapDataCard from '../MapDataCard'

import defaultTheme from '../defaultTheme'

import {Block} from 'jsxstyle'

export function getStyles(theme) {
  return {
    item: {
      fontSize: theme.fontSize,
      margin: 5,
      padding: 5,
    },
  }
}

/**
 * Holds the mapping data UI
 */
export default React.createClass({
  displayName: 'MapData',
  propTypes: {
    chartType: PropTypes.string,
    colorProp: PropTypes.string,
    data: PropTypes.array,
    groupProp: PropTypes.string,
    radiusProp: PropTypes.string,
    setProp: PropTypes.func,
    theme: PropTypes.object,
    xProp: PropTypes.string,
    yProp: PropTypes.string,
  },
  getDefaultProps() {
    return {
      theme: {...defaultTheme},
    }
  },
  render() {
    const styles = getStyles(this.props.theme)
    const {theme} = this.props
    return (
      <Block // wrapper
        background={'hsl(0, 0%, 80%)'}
        borderLeft={'2px solid hsl(0, 0%, 60%)'}
        borderRight={'2px solid hsl(0, 0%, 70%)'}
        fontFamily={theme.font}
        fontSize={theme.fontSize}
        minWidth={200}
        width={200}
      >
        <Block // title
          fontWeight={'bold'}
          margin={5}
          marginBottom={10}
          padding={5}
        >
          Mapping
        </Block>
        <Block // select wrapper
          margin={5}
          paddingTop={5}
        >
          {false &&
            <select
              style={{
                border: 'none',
                borderRadius: 0,
                fontSize: theme.fontSize,
                fontFamily: theme.font,
                display: 'flex',
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              value='chart'
            >
              <option value='chart'>Chart</option>
              <option value='matrix'>Matrix</option>
            </select>
          }
        </Block>
        <Block style={styles.item}>X Axis</Block>
        <MapDataCard
          category='x'
          data={this.props.data}
          prop={this.props.xProp}
          setProp={this.props.setProp}
        />
        <Block style={styles.item}>Y Axis</Block>
        <MapDataCard
          category='y'
          data={this.props.data}
          prop={this.props.yProp}
          setProp={this.props.setProp}
        />
        <Block style={styles.item}>Color</Block>
        <MapDataCard
          category='color'
          data={this.props.data}
          prop={this.props.colorProp}
          setProp={this.props.setProp}
        />
        <Block style={styles.item}>Size</Block>
        <MapDataCard
          category='radius'
          data={this.props.data}
          prop={this.props.radiusProp}
          setProp={this.props.setProp}
        />
        <Block style={styles.item}>Group by</Block>
        <MapDataCard
          category='group'
          data={this.props.data}
          prop={this.props.groupProp}
          setProp={this.props.setProp}
        />
      </Block>
    )
  },
})
