
const noop = () => undefined

export const ctx = {
  beginPath: noop,
  bezierCurveTo: noop,
  clearRect: noop,
  clip: noop,
  closePath: noop,
  fill: noop,
  fillRect: noop,
  fillText: noop,
  isPointInPath: noop,
  isPointInStroke: noop,
  lineTo: noop,
  measureText(text) {
    return {width: text.toString().length}
  },
  arcTo: noop,
  moveTo: noop,
  quadraticCurveTo: noop,
  rect: noop,
  restore: noop,
  rotate: noop,
  save: noop,
  scale: noop,
  strokeRect: noop,
  strokeText: noop,
  transform: noop,
  translate: noop,
}

export const canvas = {
  getContext: () => ctx,
}
