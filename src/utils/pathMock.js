// Copyright 2018 Kensho Technologies, LLC.

/**
 * Creates a pathMock object
 *
 * @function pathMock
 * @return {Object}
 */
export default function pathMock() {
  return {
    addPath() {},
    closePath() {},
    moveTo() {},
    lineTo() {},
    bezierCurveTo() {},
    quadraticCurveTo() {},
    arc() {},
    arcTo() {},
    ellipse() {},
    rect() {},
  }
}
