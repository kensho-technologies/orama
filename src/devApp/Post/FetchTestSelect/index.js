
import React, {PropTypes} from 'react'
import {map, keys} from 'lodash/fp'

const handleSelect = (props, childProps, key) =>
  props.setState({[key]: childProps.target.value})

const selectStyle = {marginLeft: 10}

export const FetchTestSelect = props =>
  <div>
    <p>
      X dimension
      <select
        onChange={childProps => handleSelect(props, childProps, 'x')}
        style={selectStyle}
        value={props.x}
      >
        {map(
          d => <option key={d} value={d}>{d}</option>,
          keys(props.applData[0])
        )}
      </select>
    </p>
    <p>
      Y dimension
      <select
        onChange={childProps => handleSelect(props, childProps, 'y')}
        style={selectStyle}
        value={props.y}
      >
        {map(
          d => <option key={d} value={d}>{d}</option>,
          keys(props.applData[0])
        )}
      </select>
    </p>
  </div>

FetchTestSelect.propTypes = {
  setState: PropTypes.func.isRequired,
  applData: PropTypes.array,
  x: PropTypes.string,
  y: PropTypes.string,
}
FetchTestSelect.defaultProps = {
  data: [],
}
