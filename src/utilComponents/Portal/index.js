import {Component} from 'react'
import {unmountComponentAtNode, unstable_renderSubtreeIntoContainer as render} from 'react-dom'

export default class Portal extends Component {

  componentDidMount() {
    this.container = document.createElement('div')
    this.container.position = 'absolute'
    this.container.top = 0
    this.container.left = 0
    this.container.right = 0
    document.body.appendChild(this.container)
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    render(this, <div {...this.props} />, this.container)
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.container)
    this.container.remove()
  }

  render() {
    return null
  }
}
