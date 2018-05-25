// Copyright 2018 Kensho Technologies, LLC.

import {get} from 'lodash'
import {Children} from 'react'

export default function getLayers(props) {
  const layers = Children.map(props.children, layer => {
    const plot = get(layer, 'type.plot') || get(layer, 'props.plot')
    return plot ? {plot, ...layer.props} : undefined
  })
  return {layers}
}
