
import React from 'react'
import R from 'ramda'

import {Block} from '../Display'

import defaultTheme from '../defaultTheme'
import pureHOC from '../../utils/pureHOC'

const mapIndexed = R.addIndex(R.map)

/**
 * Returns text elements according to the renderTextData
 */
const getTextElements = mapIndexed((d, i) => (
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
))

/**
 * Component to render text data.
 * This component is used inside of the ChartRender, and it's sibling with the CanvasRender, CanvasHoverRender and friends.
 */
const TextRender = ({
  renderTextData = [],
  size,
  theme = defaultTheme,
}) => (
  <Block
    fontFamily={theme.font}
    fontSize={theme.fontSize}
    fontWeight='bold'
    height={size.height}
    pointerEvents='none'
    position='absolute'
    width={size.width}
  >
    {getTextElements(renderTextData)}
  </Block>
)

export default pureHOC(TextRender)
