
import React from 'react'

import {State} from 'on-update'
import {Points} from '../../Layer'
import {Block, Column} from 'react-display'
import {DEFAULT_THEME as theme} from '../../defaultTheme'
import _ from 'lodash/fp'

const mouseDown = (props, childProps) => {
  const {data} = props
  const {hoverData} = childProps
  if (hoverData) {
    const index = _.indexOf(hoverData, data)
    if (index > -1) {
      data.splice(index, 1)
      props.setState({
        data: [...data],
      })
    } else {
      props.setState({
        data: [...data, hoverData],
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
      <Points
        skipExtractArrays={true}
        data={props.data}
        key='annotation'
        x='Volume'
        y='Adj. Close'
        fillValue='black'
        tooltipKeys={[]}
      />
    )
    const layers = React.Children.toArray(child.props.children).concat(
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
  data: [],
}

export const Highlight = props =>
  <State>
    <InnerHighlight {...props}/>
  </State>
