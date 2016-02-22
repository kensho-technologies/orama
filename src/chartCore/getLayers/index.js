
import _ from 'lodash/fp'
import {Children} from 'react'

export const getLayers = props => {
  const layers = Children.map(
    props.children,
    layer => {
      const plot = _.get('type.plot', layer) || _.get('props.plot', layer)
      if (plot) {
        return {
          plot,
          ...layer.props,
        }
      }
      return undefined
    }
  )
  return {layers}
}
