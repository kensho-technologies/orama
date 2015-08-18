
import React from 'react'

const styles = {
  container: {
    minWidth: 200,
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
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.item}>x</div>
        <div style={styles.item2}>space</div>
        <div style={styles.item}>y</div>
        <div style={styles.item2}>space</div>
      </div>
    )
  },
})
