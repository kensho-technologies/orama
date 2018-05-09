// Copyright 2017 Kensho Technologies, LLC.

import * as React from 'react'

import State from '../../utils/State'
import _ from 'lodash'

const mouseDown = (props, childProps) => {
  const {data} = props
  const {renderDatum} = childProps
  if (renderDatum) {
    const index = _.indexOf(data, renderDatum.data)
    if (index > -1) {
      data.splice(index, 1)
      props.onUpdate({
        data: [...data],
      })
    } else {
      props.onUpdate({
        data: [...data, renderDatum.data],
      })
    }
  }
}

const handleChart = (props, childProps) => {
  switch (childProps.action) {
    case 'mouseDown': mouseDown(props, childProps)
      break
    // case 'mouseDrag': mouseDrag(props, childProps)
    //   break
    default:
  }
}

const InnerHighlight = props => {
  const child = React.Children.only(props.children)
  if (child.type.displayName === 'ChartWidthHOC') {
    const HighlightElement = (
      <props.Component
        skipExtractArrays={true}
        key='InnerHighlight'
        fillValue='black'
        alphaValue={0.5}
        data={props.data}
        {...props.componentProps}
      />
    )
    const layers = React.Children.toArray(child.props.children)
    layers.splice(props.slice, 0,
      HighlightElement,
    )
    return (
      <div>
        {React.cloneElement(
          child,
          {onUpdate: childProps => handleChart(props, childProps)},
          layers
        )}
      </div>
    )
  }
  return <div/>
}
InnerHighlight.defaultProps = {
  slice: 1,
  data: [],
}

export const Highlight = props =>
  <State {..._.omit(props, 'children')}>
    <InnerHighlight
      children={props.children}
      onUpdate={props.onUpdate}
    />
  </State>
