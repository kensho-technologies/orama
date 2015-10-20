
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '../Display'

import shouldPureComponentUpdate from 'react-pure-render/function'
import defaultTheme from '../defaultTheme'

const mapIndexed = R.addIndex(R.map)

const getTextElements = (props) => (
  mapIndexed((d, i) => (
    <Block
      background='hsla(0, 0%, 97%, 0.6)'
      display='block'
      key={i}
      left={d.x}
      padding={2}
      position='absolute'
      textAlign={d.textAlign}
      top={d.y}
      pointerEvents='fill'
    >
      {d.text}
    </Block>
  ), props.renderTextData)
)

export default React.createClass({
  displayName: 'TextRender',
  propTypes: {
    renderTextData: PropTypes.array,
    size: PropTypes.object,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      renderTextData: [],
      theme: {...defaultTheme},
    }
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  render() {
    return (
      <Block
        display='block'
        fontFamily={this.props.theme.font}
        fontSize={this.props.theme.fontSize}
        fontWeight='bold'
        height={this.props.size.height}
        pointerEvents='none'
        position='absolute'
        width={this.props.size.width}
      >
        {getTextElements(this.props)}
      </Block>
    )
  },
})
