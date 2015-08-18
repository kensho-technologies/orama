
import React, { PropTypes } from 'react'

import PropCard from './PropCard'

const styles = {
  container: {
    maxWidth: 200,
  },
}

export default React.createClass({
  displayName: 'DataList',
  propTypes: {
    data: PropTypes.array,
  },
  getDefaultProps() {
    return {
      data: [],
    }
  },
  render() {
    const {data} = this.props
    const keys = R.keys(R.head(data))
    const elems = R.map(d => (
      <PropCard
          key={d}
          text={d}
          />
    ), keys)
    return (
      <div style={styles.container}>
        {elems}
      </div>
    )
  },
})
