/*eslint-disable */

import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC, pureHOC} from 'on-update'

import {Block} from 'react-display'

const handleClick = props => {
  console.log('click')
  props.onState({value2: props.value2 + '++'})
}

const C1 = pureHOC(props => {
  console.log('C1 render')
  return (
    <Block>
      {React.Children.map(
        props.children,
        d => React.cloneElement(d, {value1: props.value1})
      )}
    </Block>
  )
})
const C2 = pureHOC(props => {
  console.log('C2 render')
  return (
    <Block>
      <Block
        background='steelblue'
      >
        {props.value1}
      </Block>
      <Block
        background='orange'
      >
        {props.value2}
      </Block>
    </Block>
  )
})

/*
Used inside </>
*/
const Test = props => (
  <Block
    onClick={_.partial(handleClick, props)}
  >
    <C1
      value1='value1'
    >
      <C2
        value2={props.value2}
      />
    </C1>
  </Block>
)
Test.propTypes = {
  onUpdate: PropTypes.func,
  theme: PropTypes.object,
}
Test.defaultProps = {
  theme: DEFAULT_THEME,
}

const initialState = {
  value2: 'value2'
}

export default stateHOC(Test, initialState)
