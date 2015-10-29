
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import AnnotationEditorWrapper from './'

test('AnnotationEditorWrapper case1', () => {
  const component = shallowRender(<AnnotationEditorWrapper/>)
  assert.deepEqual(component.type, 'noscript')
})

test('AnnotationEditorWrapper case2', () => {
  const component = shallowRender(
    <AnnotationEditorWrapper
      annotationData={[{}]}
    />
  )
  assert.deepEqual(component.type, 'noscript')
})

test('AnnotationEditorWrapper case3', () => {
  const component2 = shallowRender(
    <AnnotationEditorWrapper
      annotationData={[{}]}
      selectedIdx={0}
    />
  )
  assert.deepEqual(component2.type.displayName, 'AnnotationEditor(state)')
})
