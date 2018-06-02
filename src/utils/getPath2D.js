// Copyright 2018 Kensho Technologies, LLC.

import pathMock from './pathMock'

/**
 * Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
 * This way we can keep running and testing on node code that uses Path2D
 */

/**
 * According to the environments, creates a new `Path2D` object or a `pathMock`.
 * @memberOf /utils/path
 *
 * @function DEFAULT
 * @return {Path2D | pathMock}
 */
export default function getPath2D() {
  if (global.Path2D) return new Path2D()
  return pathMock()
}
