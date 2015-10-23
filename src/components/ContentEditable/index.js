
import React, {PropTypes} from 'react'

const ContentEditable = React.createClass({
  displayName: 'ContentEditable',
  propTypes: {
    acceptNewLine: PropTypes.bool,
    onUpdate: PropTypes.func,
    text: PropTypes.string,
    textEditable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      acceptNewLine: false,
      onUpdate: () => undefined,
      textEditable: true,
    }
  },
  componentDidUpdate() {
    const node = this.refs.block
    if ( this.props.text !== node.innerText ) {
      node.innerText = this.props.text || ''
    }
  },
  handleInput() {
    const newText = this.refs.block.innerText.toString().replace(/(\r\n|\n|\r)/gm, '')
    this.props.onUpdate({
      ...this.props,
      text: newText,
    })
  },
  handleKeyDown(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault()
      this.refs.block.blur()
      window.getSelection().removeAllRanges()
    }
  },
  render() {
    const {props, handleInput} = this
    return (
      <div
        contentEditable={props.textEditable}
        dangerouslySetInnerHTML={{__html: props.text}}
        onBlur={handleInput}
        onInput={handleInput}
        onKeyDown={this.handleKeyDown}
        ref='block'
        style={{
          outline: 'none',
          cursor: 'text',
        }}
      />
    )
  },
})

export default ContentEditable
