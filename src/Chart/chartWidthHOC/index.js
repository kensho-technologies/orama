
import React, {PropTypes} from 'react'
import _ from 'lodash'

/*
This component wrapps up the <InputComponent/> and add a width prop when it's not present
*/
export const chartWidthHOC = InputComponent => {
  return React.createClass({
    displayName: 'ChartWidthHOC',
    propTypes: {
      width: PropTypes.number,
    },
    getInitialState() {
      return {}
    },
    componentWillReceiveProps() {
      this.updateWidth()
    },
    componentWillMount() {
      this.handleResize = _.throttle(this.updateWidth, 500)
    },
    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      this.updateWidth()
    },
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    },
    updateWidth() {
      if (this.divNode && !this.props.width) {
        const width = this.divNode.offsetWidth
        if (this.state.width !== width) {
          this.setState({width})
        }
      }
    },
    handleRef(divNode) {
      this.divNode = divNode
    },
    render() {
      return (
        <div
          ref={this.handleRef}
        >
          <InputComponent
            {...this.state}
            {...this.props}
          />
        </div>
      )
    },
  })
}
