// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test, describe, beforeEach} from 'mocha'

import DEFAULT_THEME from '../../src/defaultTheme'
import fitCheckText from '../../src/utils/fitCheckText'

describe('utils.fitCheckText', () => {
  let textData
  const width = 1000
  const height = 1000

  beforeEach(() => {
    textData = {
      text: 'text with a length of 25.',
      x: 250,
      y: 125,
    }
  })

  test('utils.fitCheckText does not shift if fits on canvas', () => {
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 250,
      y: 125,
    })
  })

  test('utils.fitCheckText shifts overflow', () => {
    textData.x = 1000
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 975,
      y: 125,
    })
  })

  test('utils.fitCheckText shifts underflow', () => {
    textData.textAlign = 'right'
    textData.x = 10
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 25,
      y: 125,
    })
  })

  test('utils.fitCheckText shifts rotated overflow', () => {
    textData.rotate = -Math.PI / 2
    textData.y = 10
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 250,
      y: 25,
    })
  })

  test('utils.fitCheckText shifts rotated underflow', () => {
    textData.rotate = -Math.PI / 2
    textData.y = 980
    textData.textAlign = 'right'
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 250,
      y: 975,
    })
  })

  test('utils.fitCheckText does not shift if rotated fits on canvas', () => {
    textData.rotate = -Math.PI / 2
    textData.y = 15
    textData.textAlign = 'right'
    assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
      ...textData,
      x: 250,
      y: 15,
    })
  })

  describe('handles centered text', () => {
    beforeEach(() => {
      textData.textAlign = 'center'
    })

    test('with overflow', () => {
      textData.x = 990
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 987.5,
        y: 125,
      })
    })

    test('with underFlow', () => {
      textData.x = 5
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 12.5,
        y: 125,
      })
    })
  })

  describe('handles offsets', () => {
    test('that fit the canvas', () => {
      textData.xOffset = -100
      textData.x = 1000
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 900,
        y: 125,
      })
    })

    test('x underflow with offset', () => {
      textData.xOffset = -100
      textData.x = 50
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 0,
        y: 125,
      })
    })

    test('y overflow with offset', () => {
      textData.yOffset = -50
      textData.rotate = -Math.PI / 2
      textData.y = 50
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 250,
        y: 25,
      })
    })

    test('that do not impact overflow or underflow', () => {
      textData.yOffset = -45
      textData.y = 45
      assert.deepEqual(fitCheckText(textData, width, height, DEFAULT_THEME), {
        ...textData,
        x: 250,
        y: 0,
      })
    })
  })
})
