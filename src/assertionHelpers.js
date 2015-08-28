
import {Test} from 'tape'
import React, {addons} from 'react/addons'

Test.prototype.checkProp = function propTypFunc(propType, actual, expected) {
  const err = propType({actual}, 'actual', 'TEST')
  const msg = err ? err.message : ''
  this._assert(!err, {
    message: msg,
    operator: 'schema match',
    actual,
    expected,
  })
}

export function renderComponent(element) {
  var shallowRenderer = addons.TestUtils.createRenderer()
  shallowRenderer.render(element)
  return shallowRenderer.getRenderOutput()
}

export const {PropTypes} = React
