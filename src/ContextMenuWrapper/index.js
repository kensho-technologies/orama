
import React, {PropTypes} from 'react'

import {Block} from 'react-display'
import ContextMenu from '../ContextMenu'

import defaultTheme from '../defaultTheme'

const handleBlockClick = props => {
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
      onMouseDown={handleBlockClick.bind(null, props)}
      position='fixed'
      right={0}
      top={0}
      zIndex={999999}
    >
      <ContextMenu
        items={props.items}
        onUpdate={handleContextMenuUpdate.bind(null, props)}
        position={props.position}
        selected={props.selected}
      />
    </Block>
  )
}
ContextMenuWrapper.propTypes = {
  items: PropTypes.array,
  onUpdate: PropTypes.func,
  position: PropTypes.object,
  selected: PropTypes.string,
  show: PropTypes.bool,
  theme: PropTypes.object,
}
ContextMenuWrapper.defaultProps = {
  theme: defaultTheme,
}

export default ContextMenuWrapper
