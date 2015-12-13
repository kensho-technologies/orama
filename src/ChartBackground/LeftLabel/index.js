
import React, {PropTypes} from 'react'

import {Block} from 'react-display'
import {DEFAULT_THEME} from '../../defaultTheme'

/**
 * Component that position and style the bottom label of the `Chart` component
 */

export const LeftLabel = props => (
  <Block
    color={props.theme.axisLabelTextFill}
    fontFamily={props.theme.fontFamily}
    fontSize={props.theme.axisLabelFontSize}
    fontWeight={props.theme.axisLabelFontWeight}
    left={0}
    overflow={'hidden'}
    position={'absolute'}
    textAlign={'center'}
    textOverflow={'ellipsis'}
    top={props.plotRect.y}
    transform={'translate(-100%) rotate(-90deg)'}
    transformOrigin={'100% 0'}
    whiteSpace={'nowrap'}
    width={props.plotRect.height}
  >
    {props.text}
  </Block>
)
LeftLabel.propTypes = {
  plotRect: PropTypes.object.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object,
}
LeftLabel.defaultProps = {
  plotRect: {x: 0, y: 0, width: 0, height: 0},
  text: '',
  theme: DEFAULT_THEME,
}
