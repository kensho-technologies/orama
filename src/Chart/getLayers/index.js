
import {Children} from 'react'

export const getLayers = props => {
  return Children.map(
    props.children,
    layer => ({
      plot: layer.type.plot,
      ...layer.props,
    })
  )
}
