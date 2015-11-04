
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
  props.onUpdate({
    ...props,
    selected: childProps.selected,
  })
}

/*
Used inside <ChartRender/>
*/
const ContextMenuWrapper = props => {
  if (!props.show) return <noscript/>
  return (
    <Block
      bottom={0}
      cursor='pointer'
      left={0}
      onMouseDown={handleClick.bind(null, props)}
      position='fixed'
      right={0}
      top={0}
      zIndex={999999}
    >
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
