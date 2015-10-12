
import React from 'react'
import ReactDOM from 'react-dom'
import R from 'ramda'

import {generateSrc, openImg} from '../../utils/imageRender'

import {Flex} from '../Display'

export default React.createClass({
  displayName: 'ChartsGroupBar',
  propTypes: {
    children: React.PropTypes.element,
  },
  handleClick() {
    generateSrc(openImg, ReactDOM.findDOMNode(this.refs.test).children[0])
  },
  render() {
    const {children} = this.props
    return (
      <Flex
        alignItems='stretch'
        flex={1}
        flexDirection='column'
      >
        <Flex
          background='hsl(0, 0%, 80%)'
          borderBottom='2px solid hsl(0, 0%, 70%)'
          justifyContent='flex-end'
          padding={5}
        >
          <button onClick={R.partial(this.handleClick, children)}>Download Graphs</button>
        </Flex>
          <Flex
            flex={1}
            overflow='scroll'
            ref='test'
          >
            {children}
          </Flex>
      </Flex>
    )
  },
})
