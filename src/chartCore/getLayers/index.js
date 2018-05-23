// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'
import {Children} from 'react'

export function getLayers(props) {
  const layers = Children.map(props.children, layer => {
    const plot = _.get(layer, 'type.plot') || _.get(layer, 'props.plot')
    if (plot) {
      return {
        plot,
        ...layer.props,
      }
    }
    return undefined
  })
  return {layers}
}
