
/**
 * Path
 * Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
 * This way we can keep running and testing on node code that uses Path2D
 * @namespace /utils/path
 */

/**
 * According to the environments, creates a new `Path2D` object or a `pathMock`.
 * @memberOf /utils/path
 *
 * @function DEFAULT
 * @return {Path2D | pathMock}
 */
export default function() {
  if (global.Path2D) return new Path2D()
  return pathMock()
}

/**
 * Creates a pathMock object
 * @memberOf /utils/path
 *
 * @function pathMock
 * @return {Object}
 */
export function pathMock() {
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
