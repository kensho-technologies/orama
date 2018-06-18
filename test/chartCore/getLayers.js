// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import getLayers from '../../src/chartCore/getLayers'

test('handles undefined children', () => {
  const props = {children: [<div plot="foo" />, undefined, <div plot="bar" />]}
  assert.deepEqual(getLayers(props), {layers: [{plot: 'foo'}, {plot: 'bar'}]})
})
