// Copyright 2017 Kensho Technologies, Inc.

import React from 'react'
import PropTypes from 'prop-types'

class ContentEditable extends React.Component {
  static propTypes = {
    acceptNewLine: PropTypes.bool,
    onUpdate: PropTypes.func,
    text: PropTypes.string,
    textEditable: PropTypes.bool,
  }
  static defaultProps = {
    acceptNewLine: false,
    onUpdate: () => undefined,
    textEditable: true,
  }
  componentDidUpdate = () => {
    const node = this.refs.block
    if (this.props.text !== node.innerText) {
      node.innerText = this.props.text || ''
    }
  }
  handleInput = () => {
    const newText = this.refs.block.innerText.toString().replace(/(\r\n|\n|\r)/gm, '')
    this.props.onUpdate({
      ...this.props,
      text: newText,
    })
  }
  handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault()
      this.refs.block.blur()
      window.getSelection().removeAllRanges()
    }
  }
  handleMouseDown = (evt) => {
    evt.stopPropagation()
  }
  render() {
    const {props, handleInput} = this
    return (
      <div
        contentEditable={props.textEditable}
        dangerouslySetInnerHTML={{__html: props.text}}
        onBlur={handleInput}
        onInput={handleInput}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        ref='block'
        style={{
          outline: 'none',
          cursor: 'text',
        }}
      />
    )
  }
}

export default ContentEditable
