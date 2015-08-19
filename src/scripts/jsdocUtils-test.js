
import test from 'tape'
import fs from 'fs'

import getDoc, * as jsdocUtils from './jsdocUtils'

const jsdoc = JSON.parse(fs.readFileSync(__dirname + '/jsdocExample.json', 'utf8'))

test('getDoc', t => {
  t.ok(getDoc)
  t.equal(typeof getDoc({}), 'string')
  t.equal(typeof getDoc(jsdoc), 'string')
  t.end()
})

test('jsdocUtils.getNamespacesNames', t => {
  t.equal(
    jsdocUtils.getNamespacesNames([]),
    ''
  )
  t.end()
})

test('jsdocUtils.genNamespaceNameString', t => {
  t.equal(
    jsdocUtils.genNamespaceNameString({name: 'Name'}),
    '- [Name](#Name)'
  )
  t.end()
})
