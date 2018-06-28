import * as React from 'react'
import PropTypes from 'prop-types'

export default class MeasuredContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onMeasure: PropTypes.func.isRequired,
  }

  wrapperRef = React.createRef()

  componentDidMount() {
    this.measure()
  }

  componentDidUpdate() {
    this.measure()
  }

  measure() {
    const {onMeasure} = this.props
    if (!this.wrapperRef.current) return
    const {offsetHeight: height, offsetWidth: width} = this.wrapperRef.current
    onMeasure(height, width)
  }

  render() {
    const {children} = this.props
    return <div ref={this.wrapperRef}>{children}</div>
  }
}
