
import test from 'tape'

import getComponents, * as utils from './reactdocToMd-utils'

test('getComponents', (t) => {
  t.ok(getComponents)
  t.equal(typeof getComponents({}), 'string');
  t.end()
})

test('getProps', (t) => {
  var {getProps} = utils
  t.ok(getProps)
  t.equal(typeof getProps({}), 'string');
  t.end()
})

test('getType', (t) => {
  var {getType} = utils
  t.ok(getType)
  t.equal(typeof getType({}), 'string');
  t.end()
})

test('getRequired', (t) => {
  var {getRequired} = utils
  t.ok(getRequired)
  t.equal(typeof getRequired({}), 'string');
  t.end()
})

test('getDefaultValue', (t) => {
  var {getDefaultValue} = utils
  t.ok(getDefaultValue)
  t.equal(typeof getDefaultValue({}), 'string');
  t.end()
})

test('getDescription', (t) => {
  var {getDescription} = utils
  t.ok(getDescription)
  t.equal(typeof getDescription({}), 'string');
  t.end()
})
