// Copyright 2018 Kensho Technologies, LLC.

/**
 * Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
 * This way we can keep running and testing on node code that uses Path2D
 * @namespace /utils/path
 */

/**
 * Creates a pathMock object
 * @memberOf /utils/path
 *
 * @function pathMock
 * @return {Object}
 */
export const pathMock = () => ({
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
})

/**
 * According to the environments, creates a new `Path2D` object or a `pathMock`.
 * @memberOf /utils/path
 *
 * @function DEFAULT
 * @return {Path2D | pathMock}
 */
export const getPath2D = () => {
  if (global.Path2D) return new Path2D()
  return pathMock()
}
