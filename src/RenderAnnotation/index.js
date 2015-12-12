
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from 'react-display'
import Annotation from '../Annotation'

import {DEFAULT_THEME} from '../defaultTheme'
const mapIndexed = R.addIndex(R.map)

const handleAnnotationUpdate = (props, annotationIdx, childProps) => {
  if (childProps.clicked) {
    props.onUpdate({
      ...props,
      clickedIdx: annotationIdx,
    })
  }
}

/*
Used inside <ChartRender/>
can update: 'updateClickedIdx'
*/
const RenderAnnotation = props => (
  <Block
    fontFamily={props.theme.fontFamily}
    fontSize={props.theme.fontSize}
    fontWeight='bold'
    height={props.size.height}
    overflow='hidden'
    pointerEvents='none'
    position='absolute'
    width={props.size.width}
  >
    {mapIndexed((d, i) => (
      <Annotation
        key={i}
        onUpdate={handleAnnotationUpdate.bind(null, props, i)}
        text={d.text}
        textAlign={d.textAlign}
        x={d.x}
        y={d.y}
      />
    ), props.annotationData)}
  </Block>
)

RenderAnnotation.propTypes = {
  annotationData: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
RenderAnnotation.defaultProps = {
  annotationData: [],
  theme: DEFAULT_THEME,
}
Annotation.updateOnlyTypes = {
  clickedIdx: PropTypes.number,
}
Annotation.canUpdate = [
  'clickedIdx',
]

export default RenderAnnotation
