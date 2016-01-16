
import {Children} from 'react'

export const getLayers = props => {
  const layers = Children.map(
    props.children,
    layer => ({
      plot: layer.type.plot,
      ...layer.props,
    })
  )
  return {layers}
}
