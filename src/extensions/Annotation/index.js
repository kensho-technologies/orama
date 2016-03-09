
import React from 'react'

import {State} from 'on-update'
import {Text} from '../../Layer'
import {Block, Column} from 'react-display'
import {DEFAULT_THEME as theme} from '../../defaultTheme'

const textareaStyle = {
  border: 'none',
  outline: 'none',
  resize: 'none',
  height: 40,
}
const btnStyle = {
  backgroundColor: 'gray',
  color: 'white',
  border: 'none',
  outline: 'none',
}

const handleTextarea = (props, evt) =>
  props.setState({
    textarea: evt.target.value,
  })

const handleBtn = (props) => {
  props.setState({
    showPopup: false,
  })
  props.onUpdate({
    data: [
      ...props.data,
      {text: props.textarea, x: props.x, y: props.y},
    ],
  })
}

const Popup = (props) =>
  <Column
    background={theme.tooltipBackgroundFill}
    boxShadow={`1px 1px 1px ${theme.tooltipBoxShadowFill}`}
    position='fixed'
    top={props.yPopup}
    left={props.xPopup}
    padding={1}
  >
    <Block
      fontSize='12'
      textAlign='center'
    >Add Label</Block>
    <textarea
      style={textareaStyle}
      onChange={evt => handleTextarea(props, evt)}
    />
    <button
      style={btnStyle}
      onClick={() => handleBtn(props)}
    >Apply</button>
  </Column>

const mouseDown = (props, childProps) => {
  const x = childProps.rootProps.xScale.invert(childProps.localMouse.x)
  const y = childProps.rootProps.yScale.invert(childProps.localMouse.y)
  props.setState({
    showPopup: true,
    xPopup: childProps.mouse.x,
    yPopup: childProps.mouse.y,
    x,
    y,
  })
  // props.onUpdate({
  //   data: [
  //     ...props.data,
  //     {text: 'TEXT', x, y},
  //   ],
  // })
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
    return (
      <div>
        {React.cloneElement(
          child,
          {onUpdate: childProps => handleChart(props, childProps)},
          layers
        )}
        {props.showPopup &&
          <Popup {...props}/>
        }
      </div>
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
