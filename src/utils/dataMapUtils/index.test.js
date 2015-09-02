
import {it as test} from 'mocha'
import assert from 'assert'

import R from 'ramda'
import React from 'react'
import d3Scale from 'd3-scale'

import * as dataMapUtils from './'

test('dataMapUtils', () => {
  assert(dataMapUtils)
  assert.throws(R.partial(dataMapUtils.checkSchema, {
    x: React.PropTypes.shape({
      scale: React.PropTypes.func.isRequired,
    }).isRequired,
  }, {}))
  assert(dataMapUtils.checkSchema({
    x: React.PropTypes.shape({
      scale: React.PropTypes.string.isRequired,
    }).isRequired,
  }, {x: {scale: ''}}))
})

test('dataMapUtils.getMap', () => {
  const map1 = dataMapUtils.getMap()
  assert.deepEqual(
    map1(0),
    undefined
  )
  const map2 = dataMapUtils.getMap({
    range: [0, 100],
    path: ['p1'],
    scale: d3Scale.linear().domain([0, 50]).range([0, 100]),
  })
  assert.deepEqual(
    map2({p1: 0}),
    0
  )
})
