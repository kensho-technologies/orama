// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'

export default function getLayers(props) {
  const layers = React.Children.map(
    props.children,
    child => (child && child.props.plot ? child.props : undefined)
  )
  return {layers}
}
