
import {it as test} from 'mocha'
import assert from 'assert'
import fs from 'fs'

import getDoc, * as jsdocUtils from './jsdocUtils'

const jsdoc = JSON.parse(fs.readFileSync(__dirname + '/jsdocExample.json', 'utf8'))

test('getDoc', () => {
  assert(getDoc)
  assert.strictEqual(typeof getDoc({}), 'string')
  assert.strictEqual(typeof getDoc(jsdoc), 'string')
})

test('jsdocUtils.getNamespacesNames', () => {
  assert.strictEqual(
    jsdocUtils.getNamespacesNames([]),
    ''
  )
})

test('jsdocUtils.genNamespaceNameString', () => {
  assert.strictEqual(
    typeof jsdocUtils.genNamespaceNameString({name: 'Name'}),
    'string'
  )
})
