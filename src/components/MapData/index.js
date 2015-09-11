
import React, {PropTypes} from 'react'

import MapDataCard from '../MapDataCard'

import defaultStyleVars from '../styleVars'

export function getStyles(styleVars) {
  return {
    container: {
      fontSize: styleVars.fontSize,
      fontFamily: styleVars.font,
      minWidth: 200,
      width: 200,
      background: 'hsl(0, 0%, 80%)',
      borderLeft: '2px solid hsl(0, 0%, 60%)',
      borderRight: '2px solid hsl(0, 0%, 70%)',
    },
    item: {
      fontSize: styleVars.fontSize,
      margin: 5,
      padding: 5,
    },
    item2: {
      background: 'hsl(0, 0%, 90%)',
      fontSize: 15,
      margin: 5,
      padding: 5,
    },
    title: {
      padding: 5,
      margin: 5,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  }
}

/**
 * Holds the mapping data UI
 */
export default React.createClass({
  displayName: 'MapData',
  propTypes: {
    colorProp: PropTypes.string,
    data: PropTypes.array,
    groupProp: PropTypes.string,
    radiusProp: PropTypes.string,
    setProp: PropTypes.func,
    styleVars: PropTypes.object,
    xProp: PropTypes.string,
    yProp: PropTypes.string,
  },
  getDefaultProps() {
    return {
      styleVars: {...defaultStyleVars},
    }
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    return (
      <div style={styles.container}>
        <div style={styles.title}>Mapping</div>
        <div style={styles.item}>X Axis</div>
        <MapDataCard
          category='x'
          data={this.props.data}
          prop={this.props.xProp}
          setProp={this.props.setProp}
        />
        <div style={styles.item}>Y Axis</div>
        <MapDataCard
          category='y'
          data={this.props.data}
          prop={this.props.yProp}
          setProp={this.props.setProp}
        />
        <div style={styles.item}>Group by</div>
        <MapDataCard
          category='group'
          data={this.props.data}
          prop={this.props.groupProp}
          setProp={this.props.setProp}
        />
        <div style={styles.item}>Color</div>
        <MapDataCard
          category='color'
          data={this.props.data}
          prop={this.props.colorProp}
          setProp={this.props.setProp}
        />
        <div style={styles.item}>Size</div>
        <MapDataCard
          category='radius'
          data={this.props.data}
          prop={this.props.radiusProp}
          setProp={this.props.setProp}
        />
      </div>
    )
  },
})
