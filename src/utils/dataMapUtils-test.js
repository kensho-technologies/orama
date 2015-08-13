
import test from 'tape'

import R from 'ramda'
import React from 'react'

import * as dataMapUtils from './dataMapUtils'

test('dataMapUtils', t => {
  t.ok(dataMapUtils)
  t.throws(R.partial(dataMapUtils.checkSchema, {
      x: React.PropTypes.shape({
        scale: React.PropTypes.func.isRequired,
      }).isRequired,
    }, {}))
  t.ok(dataMapUtils.checkSchema({
      x: React.PropTypes.shape({
        scale: React.PropTypes.func.isRequired,
      }).isRequired,
    }, {x: {scale: function(){}}}))
  t.end()
})
