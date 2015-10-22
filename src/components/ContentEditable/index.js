
import React, {PropTypes} from 'react'

const ContentEditable = React.createClass({
  displayName: 'ContentEditable',
  propTypes: {
    onUpdate: PropTypes.func,
    text: PropTypes.string,
    textEditable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
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
  render() {
    const {props, handleInput} = this
    return (
      <div
        contentEditable={props.textEditable}
        dangerouslySetInnerHTML={{__html: props.text}}
        onBlur={handleInput}
        onInput={handleInput}
        ref='block'
        style={{
          cursor: 'text',
        }}
      />
    )
  },
})

export default ContentEditable
