
import React, {PropTypes} from 'react'
import _ from 'lodash/fp'
import {Block, Inline} from 'react-display'
import {theme} from '../../theme'

const chartTest = /<Chart>/g
const mapSplit = _.map(d => {
  if (!chartTest.test(d)) return d
  return <Inline fontWeight='bold'>{d}</Inline>
})

const runMatch = children =>
  React.Children.map(children, d => {
    if (!_.isString(d)) return d
    const split = d.split(/(<Chart[\s\S][^>]+>[\s\S]+?<\/Chart>)/g)
    return mapSplit(split)
  })


export const Code = props => (
  <Block
    color='hsl(201, 78%, 28%)'
    flex={1}
    fontFamily={theme.fontFamilyMono}
    fontSize={16}
    lineHeight={1}
    marginBottom={16 * 1.4}
    marginTop={16 * 1.4}
    whiteSpace='pre-wrap'
    {...props}
  >
    {runMatch(props.children)}
  </Block>
)
Code.propTypes = {
  children: PropTypes.node,
}
