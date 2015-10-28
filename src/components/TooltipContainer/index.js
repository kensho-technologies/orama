
import React, {PropTypes} from 'react'
import R from 'ramda'

const TooltipContainer = props => {
  const firstSelection = R.head(props.renderSelectedData)
  if (!firstSelection) return <div/>
  if (!firstSelection.tooltipComponent) return <div/>
  return (
    <firstSelection.tooltipComponent
      {...firstSelection}
    />
  )
}

TooltipContainer.PropTypes = {
  renderSelectedData: PropTypes.array,
}

TooltipContainer.defaultProps = {
  renderSelectedData: [],
}

export default TooltipContainer
