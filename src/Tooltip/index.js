
import React, {PropTypes} from 'react'
import R from 'ramda'
import {Block, Table, TableCell, TableRow} from 'react-display'

import If from '../If'

import defaultTheme from '../defaultTheme'

export default React.createClass({
  displayName: 'Tooltip',
  propTypes: {
    hoverData: PropTypes.object,
    mouse: PropTypes.object,
    styleVars: PropTypes.object,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      mouse: {},
      theme: {...defaultTheme},
    }
  },
  render() {
    const {hoverData, theme} = this.props
    if (!hoverData) return null
    const trElements = R.addIndex(R.map)((d, i) => {
      if (!d.prop) return undefined
      const trBackground = i % 2 ? theme.tooltip.listBackground : theme.tooltip.listEvenBackground
      return (
        <TableRow
          background={trBackground}
          key={i}
        >
          <TableCell // Name
            padding={10}
            textAlign='left'
            verticalAlign='top'
          >
            {d.alias || d.prop}
          </TableCell>
          <TableCell // Value
            fontFamily={theme.fontMono}
            padding={10}
            textAlign='right'
            verticalAlign='top'
          >
            {hoverData.raw[d.prop]}
          </TableCell>
        </TableRow>
      )
    }, hoverData.tooltip || [])
    return (
      <Block // Wrapper
        background={theme.tooltip.background}
        color={theme.tooltip.color}
        fontFamily={theme.font}
        fontSize={theme.fontSize}
        left={this.props.mouse.x}
        margin={13}
        maxWidth={300}
        padding={0}
        pointerEvents='none'
        position='fixed'
        top={this.props.mouse.y}
        zIndex={900}
      >
        <If condition={hoverData.label}>
          <Block // Title
            fontSize={theme.tooltip.titleFontSize}
            fontWeight='bold'
            padding={10}
            paddingBottom={8}
          >
            {hoverData.label}
          </Block>
        </If>
        <Table>
          {trElements}
        </Table>
      </Block>
    )
  },
})
