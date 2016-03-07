
import React from 'react'

import {State} from 'on-update'
import {Text} from '../../Layer'


const mouseDown = (props, childProps) => {
  const x = childProps.rootProps.xScale.invert(childProps.localMouse.x)
  const y = childProps.rootProps.yScale.invert(childProps.localMouse.y)
  props.onUpdate({
    data: [
      ...props.data,
      {text: 'TEXT', x, y},
    ],
  })
}
// const mouseDrag = (props, childProps) => {
//
// }

const handleChart = (props, childProps) => {
  switch (childProps.action) {
    case 'mouseDown': mouseDown(props, childProps)
      break
    // case 'mouseDrag': mouseDrag(props, childProps)
    //   break
    default:
  }
}

const InnerAnnotation = props => {
  const child = React.Children.only(props.children)
  if (child.type.displayName === 'ChartWidthHOC') {
    const AnnotationElement = (
      <Text
        skipExtractArrays={true}
        data={props.data}
        key='annotation'
        x='x' y='y'
        text='text'
        tooltipKeys={[]}
      />
    )
    const layers = React.Children.toArray(child.props.children).concat(
      AnnotationElement,
    )
    return React.cloneElement(
      child,
      {onUpdate: childProps => handleChart(props, childProps)},
      layers
    )
  }
  return <div/>
}
InnerAnnotation.defaultProps = {
  data: [],
}

export const Annotation = props =>
  <State>
    <InnerAnnotation {...props}/>
  </State>
