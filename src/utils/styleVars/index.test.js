
import test from 'tape'

import * as styleVars from './'

test('styleVars.getStyleVars', t => {
  t.equal(
    typeof styleVars.getStyleVars(),
    'object'
  )
  t.end()
})

test('styleVars.getStyleVars', t => {
  t.equal(
    styleVars.setStyleVars({t: 'test'}),
    undefined
  )
  t.equal(
    styleVars.getStyleVars().t,
    'test'
  )
  t.end()
})
