
import R from 'ramda'

export function generateSrc(clbck, node) {
  const width = node.scrollWidth
  const height = node.scrollHeight
  const cloned = node.cloneNode(true)
  const canvasNodes = node.querySelectorAll('canvas')
  const eachIndexed = R.addIndex(R.map)
  eachIndexed((cloneCanvas, idx) => {
    const canvas = canvasNodes[idx]
    const img = document.createElement('img')
    img.src = canvas.toDataURL('image/png')
    img.setAttribute('style', canvas.getAttribute('style'))
    img.setAttribute('width', canvas.getAttribute('width') + 'px')
    img.setAttribute('height', canvas.getAttribute('height') + 'px')
    cloneCanvas.parentNode.replaceChild(img, cloneCanvas)
  }, cloned.querySelectorAll('canvas'))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  var ctx = canvas.getContext('2d')
  const serializer = new XMLSerializer()
  const data = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject
        width="${width}"
        height="${height}"
      >
        ${serializer.serializeToString(cloned)}
      </foreignObject>
    </svg>`
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data)
  const img = new Image()
  img.setAttribute('crossOrigin', 'anonymous')
  img.src = url
  img.onload = function onImgLoad() {
    ctx.drawImage(img, 0, 0)
    const src = canvas.toDataURL('image/png')
    clbck(src)
  }
}

export function openImg(src) {
  window.open(src)
}

export function downloadImg(src, name = 'chart') {
  const link = document.createElement('a')
  link.download = name
  link.href = src
  document.body.appendChild(link)
  link.click()
  link.remove()
}
