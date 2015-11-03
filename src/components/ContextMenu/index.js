
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Block} from '@luiscarli/display'
import ContextMenuItem from '../ContextMenuItem'

import defaultTheme from '../defaultTheme'

const handleContextMenuItemUpdate = (props, childProps) => {
  if (!childProps.clicked) return
  props.onUpdate({
    ...props,
    selected: childProps.text,
  })
}
const ContextMenu = props => (
  <Block
    background='hsla(0, 0%, 93%, 0.9)'
    borderRadius={5}
    boxShadow='1px 1px 10px hsla(0, 0%, 0%, 0.8)'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    left={props.position.x}
    padding='5px 0px'
    position='absolute'
    top={props.position.y}
  >
    {_.map(props.items, (d, i) => (
      <ContextMenuItem
        key={i}
        onUpdate={handleContextMenuItemUpdate.bind(null, props)}
        text={d}
        theme={props.theme}
      />
    ))}
  </Block>
)
ContextMenu.propTypes = {
  items: PropTypes.array,
  onUpdate: PropTypes.func,
  position: PropTypes.object,
  theme: PropTypes.object,
}
ContextMenu.updateOnlyTypes = {
  selected: PropTypes.bool,
}
ContextMenu.canUpdate = [
  'selected',
]
ContextMenu.defaultProps = {
  position: {x: 0, y: 0},
  theme: defaultTheme,
}

export default ContextMenu
