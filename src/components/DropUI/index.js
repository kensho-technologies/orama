
import React, {PropTypes} from 'react'

import DropCard from '../DropCard'

const styles = {
  container: {
    minWidth: 200,
    maxWidth: 200,
  },
  item: {
    fontSize: 15,
    margin: 5,
    padding: 5,
  },
  item2: {
    background: 'hsl(0, 0%, 90%)',
    fontSize: 15,
    margin: 5,
    padding: 5,
  },
}

export default React.createClass({
  displayName: 'DropUI',
  propTypes: {
    colorProp: PropTypes.string,
    groupProp: PropTypes.string,
    setColorProp: PropTypes.func,
    setGroupProp: PropTypes.func,
    setXProp: PropTypes.func,
    setYProp: PropTypes.func,
    xProp: PropTypes.string,
    yProp: PropTypes.string,
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.item}>x</div>
        <DropCard
          setText={this.props.setXProp}
          text={this.props.xProp}
        />
        <div style={styles.item}>y</div>
        <DropCard
          setText={this.props.setYProp}
          text={this.props.yProp}
        />
        <div style={styles.item}>group</div>
        <DropCard
          setText={this.props.setGroupProp}
          text={this.props.groupProp}
        />
        <div style={styles.item}>color</div>
        <DropCard
          setText={this.props.setColorProp}
          text={this.props.colorProp}
        />
      </div>
    )
  },
})
