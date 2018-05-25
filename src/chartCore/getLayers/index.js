// Copyright 2018 Kensho Technologies, LLC.

import {get} from 'lodash'
import {Children} from 'react'

export function getLayers(props) {
  const layers = Children.map(props.children, layer => {
    const plot = get(layer, 'type.plot') || get(layer, 'props.plot')
    if (plot) {
      return {plot, ...layer.props}
    }
    return undefined
  })
  return {layers}
}
