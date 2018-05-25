// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'
import * as React from 'react'
import {indexOf, omit} from 'lodash'

import State from '../../utils/State'

function mouseDown(props, childProps) {
  const {data} = props
  const {renderDatum} = childProps
  if (renderDatum) {
    const index = indexOf(data, renderDatum.data)
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

function handleChart(props, childProps) {
  switch (childProps.action) {
    case 'mouseDown':
      mouseDown(props, childProps)
      break
    // case 'mouseDrag': mouseDrag(props, childProps)
    //   break
    default:
  }
}

function InnerHighlight(props) {
  const child = React.Children.only(props.children)
  if (child.type.displayName === 'ChartWidthHOC') {
    const HighlightElement = (
      <props.Component
        skipExtractArrays
        key="InnerHighlight"
        fillValue="black"
        alphaValue={0.5}
        data={props.data}
        {...props.componentProps}
      />
    )
    const layers = React.Children.toArray(child.props.children)
    layers.splice(props.slice, 0, HighlightElement)
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
  return <div />
}

InnerHighlight.propTypes = {
  children: PropTypes.node,
  componentProps: PropTypes.object,
  data: PropTypes.array,
  slice: PropTypes.number,
}

InnerHighlight.defaultProps = {
  slice: 1,
  data: [],
}

export const Highlight = props => (
  <State {...omit(props, 'children')}>
    <InnerHighlight children={props.children} onUpdate={props.onUpdate} />
  </State>
)

Highlight.propTypes = {
  children: PropTypes.node,
  onUpdate: PropTypes.func,
}
