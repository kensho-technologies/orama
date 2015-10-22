
import React, {PropTypes} from 'react'

import {Block} from '../Display'
import ContentEditable from '../ContentEditable'

import stateHOC from '../../utils/stateHOC'

const handleContentEditableUpdate = (props, childProps) => (
  props.onUpdate({
    ...props,
    text: childProps.text,
  })
)

const TextItem = props => (
  <Block
    background='hsla(0, 0%, 97%, 0.6)'
    display='block'
    left={props.x}
    padding={2}
    pointerEvents='fill'
    position='absolute'
    textAlign={props.textAlign}
    top={props.y}
  >
    <ContentEditable
      onUpdate={handleContentEditableUpdate.bind(null, props)}
      text={props.text}
    />
  </Block>
)

TextItem.propTypes = {
  onUpdate: PropTypes.func,
  text: PropTypes.string,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TextItem.defaultProps = {
  onUpdate: () => undefined,
}

export default stateHOC(TextItem)
