
import React, {PropTypes} from 'react'
import R from 'ramda'

import PropCard from '../PropCard'
import {Block, Flex} from 'react-display'

import {DEFAULT_THEME} from '../defaultTheme'

/**
 * Component responsible for holdind the data properties to be dragged to the data mapping.
 * It's used inside of the `Vis` component.
 */
export default React.createClass({
  displayName: 'DataList',
  propTypes: {
    data: PropTypes.array,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      data: [],
      theme: {...DEFAULT_THEME},
    }
  },
  getInitialState() {
    return {
      filter: '',
    }
  },
  onInputChage(event) {
    this.setState({filter: event.target.value})
  },
  onClose() {
    this.setState({filter: ''})
  },
  render() {
    const {data, theme} = this.props
    const keys = R.keys(R.head(data))
    const filteredKeys = R.filter(R.test(new RegExp(this.state.filter, 'i')), keys)
    const propCardElems = R.map(d => (
      <PropCard
        key={d}
        prop={d}
        theme={this.props.theme}
      />
    ), filteredKeys)

    return (
      <Flex // container
        background={'hsl(0, 0%, 80%)'}
        flexDirection={'column'}
        fontFamily={theme.fontFamily}
        fontSize={theme.fontSize}
        minWidth={200}
        width={200}
      >
        <Block // title
          fontWeight={'bold'}
          margin={5}
          marginBottom={10}
          padding={5}
        >
          Data
        </Block>
        <Flex // input wrapper
          flexShrink={0}
          margin={5}
        >
          <input
            onChange={this.onInputChage}
            placeholder='search'
            style={{
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSize,
              maxWidth: 150,
              padding: 5,
            }}
            type='text'
            value={this.state.filter}
          />
          <div // close btn
            onClick={this.onClose}
            style={{
              background: 'hsl(0, 0%, 54%)',
              borderRadius: 50,
              color: 'white',
              cursor: 'pointer',
              fontSize: 10,
              height: 12,
              marginLeft: 5,
              marginTop: 5,
              padding: '2px 6px',
              paddingBottom: 4,
            }}
          >
            x
          </div>
        </Flex>
        <Flex
          flexDirection='column'
          overflow='scroll'
        >
          {propCardElems}
        </Flex>
      </Flex>
    )
  },
})
