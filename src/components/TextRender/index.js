
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '../Display'

import defaultTheme from '../defaultTheme'

const mapIndexed = R.addIndex(R.map)

/**
 * Component to render text data.
 * This component is used inside of the ChartRender, and it's sibling with the CanvasRender, CanvasHoverRender and friends.
 */
const TextRender = props => (
  <Block
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    fontWeight='bold'
    height={props.size.height}
    pointerEvents='none'
    position='absolute'
    width={props.size.width}
  >
    {mapIndexed((d, i) => (
      <Block
        background='hsla(0, 0%, 97%, 0.6)'
        display='block'
        key={i}
        left={d.x}
        padding={2}
        pointerEvents='fill'
        position='absolute'
        textAlign={d.textAlign}
        top={d.y}
      >
        {d.text}
      </Block>
    ), props.renderTextData)}
  </Block>
)

TextRender.propTypes = {
  renderTextData: PropTypes.array,
  size: PropTypes.object,
  theme: PropTypes.object,
}

TextRender.defaultProps = {
  renderTextData: [],
  theme: defaultTheme,
}

export default TextRender
