
import test from 'tape'

import R from 'ramda'
import React from 'react'
import d3Scale from 'd3-scale'

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
      scale: React.PropTypes.string.isRequired,
    }).isRequired,
  }, {x: {scale: ''}}))
  t.end()
})

test('dataMapUtils.getMap', t => {
  const map1 = dataMapUtils.getMap()
  t.deepEqual(
    map1(0),
    undefined
  )
  const map2 = dataMapUtils.getMap({
    range: [0, 100],
    path: ['p1'],
    scale: d3Scale.linear().domain([0, 50]).range([0, 100]),
  })
  t.deepEqual(
    map2({p1: 0}),
    0
  )
  t.end()
})
