
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '@luiscarli/display'
import TextItem from '../TextItem'

import defaultTheme from '../defaultTheme'

const mapIndexed = R.addIndex(R.map)

const handleTextItemClick = () => {
  // console.log(childProps)
}

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
    overflow='hidden'
    pointerEvents='none'
    position='absolute'
    width={props.size.width}
  >
    {mapIndexed((d, i) => (
      <TextItem
        {...d}
        idx={i}
        key={i}
        onClick={handleTextItemClick.bind(null, props)}
        size={props.size}
      />
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
