// Copyright 2018 Kensho Technologies, LLC.

import {reduce} from 'lodash'

import {plotValue} from '../plotValue'

export function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
  const d01 = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
  const d12 = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const fa = t * d01 / (d01 + d12)
  const fb = t - fa

  const p1x = x1 + fa * (x0 - x2)
  const p1y = y1 + fa * (y0 - y2)

  const p2x = x1 - fb * (x0 - x2)
  const p2y = y1 - fb * (y0 - y2)

  return [p1x, p1y, p2x, p2y]
}

export function splineInterpolation(props, data, path) {
  const t = 0.5
  const pts = reduce(
    data,
    (acc, d) => {
      acc.push(plotValue(props, d, undefined, 'x'))
      acc.push(plotValue(props, d, undefined, 'y'))
      return acc
    },
    []
  )
  let cp = []
  const n = pts.length
  for (let i = 0; i < n - 4; i += 2) {
    cp = cp.concat(
      getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t)
    )
  }
  path.moveTo(pts[0], pts[1])
  path.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3])
  for (let i = 2; i < pts.length - 5; i += 2) {
    path.moveTo(pts[i], pts[i + 1])
    path.bezierCurveTo(
      cp[2 * i - 2],
      cp[2 * i - 1],
      cp[2 * i],
      cp[2 * i + 1],
      pts[i + 2],
      pts[i + 3]
    )
  }
  path.moveTo(pts[n - 2], pts[n - 1])
  path.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3])
}
