
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'
import ContextMenu from '../ContextMenu'

import defaultTheme from '../defaultTheme'

const handleClick = props => {
  props.onUpdate({
    ...props,
    show: false,
  })
}
const handleContextMenuUpdate = (props, childProps) => {
  console.log(childProps)
}

/*
Used inside <ChartRender/>
*/
const ContextMenuWrapper = props => {
  if (!props.show) return <noscript/>
  return (
    <Block
      cursor='pointer'
      onMouseDown={handleClick.bind(null, props)}
      position='relative'
      zIndex={999999}
    >
      <Block
        bottom={0}
        left={0}
        position='fixed'
        right={0}
        top={0}
      />
      <ContextMenu
        items={props.items}
        onUpdate={handleContextMenuUpdate.bind(null, props)}
        position={props.position}
      />
    </Block>
  )
}
ContextMenuWrapper.propTypes = {
  onUpdate: PropTypes.func,
  position: PropTypes.object,
  show: PropTypes.bool,
  theme: PropTypes.object,
}
ContextMenuWrapper.updateOnlyTypes = {}
ContextMenuWrapper.canUpdate = [
  'show',
]
ContextMenuWrapper.defaultProps = {
  theme: defaultTheme,
}

export default ContextMenuWrapper
