
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {getWindow} from '../utils/windowUtils'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'
import {Table, TableRow, TableCell} from 'react-display'
import {BlockSize} from '../BlockSize'
import {extractTooltipData} from '../Chart/extractTooltipData'

const TOOLTIP_MARGIN = 15
const MAX_WIDTH = 320

/*
Used inside <ChartRenderWrapper/>
*/
const getBorder = (props, i) => {
  if (i % 2) {
    return `2px solid ${props.theme.tooltip.listEvenBackground}`
  }
  return `2px solid ${props.theme.tooltip.listBackground}`
}

const row = (props, d, i) => (
  <TableRow
    background={i % 2 ? props.theme.tooltip.listBackground : props.theme.tooltip.listEvenBackground}
    key={i}
  >
    <TableCell
      borderRight={getBorder(props, i)}
      padding={10}
    >
      {d.key}
    </TableCell>
    <TableCell // Name
      padding={10}
      textAlign='left'
      verticalAlign='top'
    >
      {d.name}
    </TableCell>
    <TableCell // Value
      fontFamily={props.theme.fontMono}
      padding={10}
      textAlign='right'
      verticalAlign='top'
    >
      {d.value}
    </TableCell>
  </TableRow>
)
row.propTypes = {
  theme: PropTypes.object,
}

const handleBlockSizeUpdate = (props, childProps) => {
  props.onState({
    width: childProps.width,
    height: childProps.height,
  })
}

const getTooltipPosition = props => {
  const _window = getWindow()
  if (!props.width || !props.height) {
    return {}
  }
  const pos = {}
  if (props.lastMousePos.x + props.width + TOOLTIP_MARGIN * 2 + 1 > _window.innerWidth) {
    if (props.width + TOOLTIP_MARGIN * 2 > props.lastMousePos.x) {
      pos.left = 0
    } else {
      pos.right = _window.innerWidth - props.lastMousePos.x
    }
  } else {
    pos.left = props.lastMousePos.x
  }
  if (props.lastMousePos.y + props.height + TOOLTIP_MARGIN * 2 + 1 > _window.innerHeight) {
    if (props.height + TOOLTIP_MARGIN * 2 > props.lastMousePos.y) {
      pos.top = 0
    } else {
      pos.bottom = _window.innerHeight - props.lastMousePos.y
    }
  } else {
    pos.top = props.lastMousePos.y
  }
  return pos
}

const InnerTooltip = props => (
  <Table>
    {props.title ?
      <TableRow
        background={props.theme.tooltip.listBackground}
      >
        <TableCell/>
        <TableCell // Name
          fontWeight='bold'
          padding={10}
          textAlign='left'
          verticalAlign='top'
        >
          {props.title}
        </TableCell>
        <TableCell/>
      </TableRow>
    : null}
    {_.map(
      props.values,
      (d, i) => row(props, d, i)
    )}
  </Table>
)

const _Tooltip = props => (
  <BlockSize
    background={props.theme.tooltip.listBackground}
    boxShadow='1px 1px 4px hsla(0, 0%, 0%, 0.8)'
    color='white'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    margin={TOOLTIP_MARGIN}
    maxWidth={MAX_WIDTH}
    onUpdate={childProps => handleBlockSizeUpdate(props, childProps)}
    pointerEvents='none'
    position='fixed'
    zIndex='999999'
    {...getTooltipPosition(props)}
  >
    <InnerTooltip
      {...extractTooltipData(
        props.layerConfig, props.layerConfig.dimensions, props.hoverData
      )}
    />
  </BlockSize>
)
_Tooltip.propTypes = {
  lastMousePos: PropTypes.object,
  onUpdate: PropTypes.func,
  theme: PropTypes.object,
  tooltipData: PropTypes.object,
}
_Tooltip.defaultProps = {
  lastMousePos: {x: 0, y: 0},
  theme: DEFAULT_THEME,
  tooltipData: {},
  layerConfig: {dimensions: []},
  hoverData: {},
}

export const Tooltip = stateHOC(_Tooltip)
