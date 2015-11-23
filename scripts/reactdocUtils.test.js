
import {it as test} from 'mocha'
import assert from 'assert'

import getComponents, * as utils from './reactdocUtils'

test('getComponents', () => {
  assert(getComponents)
  assert.strictEqual(typeof getComponents({}), 'string')
})

test('getProps', () => {
  var {getProps} = utils
  assert(getProps)
  assert.strictEqual(typeof getProps({}), 'string')
})

test('getType', () => {
  var {getType} = utils
  assert(getType)
  assert.strictEqual(typeof getType({}), 'string')
})

test('getRequired', () => {
  var {getRequired} = utils
  assert(getRequired)
  assert.strictEqual(typeof getRequired({}), 'string')
})

test('getDefaultValue', () => {
  var {getDefaultValue} = utils
  assert(getDefaultValue)
  assert.strictEqual(typeof getDefaultValue({}), 'string')
})

test('getDescription', () => {
  var {getDescription} = utils
  assert(getDescription)
  assert.strictEqual(typeof getDescription({}), 'string')
})
