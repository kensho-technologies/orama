
import {each} from 'lodash'
import {getWindow} from '../windowUtils'

/*
Render a DOM to a dataURL source, which can be used to generate a downloadable image.
The size of the node is used for setting the size of the rendered image

@example
generateSrc(
  node,
  dataURL => downloadImg(dataURL),
)
*/
export function generateSrc(node, clbck) {
  const width = node.scrollWidth
  const height = node.scrollHeight
  const cloned = node.cloneNode(true)
  const canvasNodes = node.querySelectorAll('canvas')
  each(
    cloned.querySelectorAll('canvas'),
    (cloneCanvas, idx) => {
      const canvas = canvasNodes[idx]
      const img = document.createElement('img')
      img.src = canvas.toDataURL('image/png')
      img.setAttribute('style', canvas.getAttribute('style'))
      img.setAttribute('width', `${canvas.getAttribute('width')} px`)
      img.setAttribute('height', `${canvas.getAttribute('height')} px`)
      cloneCanvas.parentNode.replaceChild(img, cloneCanvas)
    }
  )
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
  const url = `data:image/svg+xml;charset=utf-8, ${encodeURIComponent(data)}`
  const img = new Image()
  img.setAttribute('crossOrigin', 'anonymous')
  img.src = url
  img.onload = function onImgLoad() {
    ctx.drawImage(img, 0, 0)
    const dataURL = canvas.toDataURL('image/png')
    clbck(dataURL)
  }
}

/*
Open image in a new tab
*/
export function openImg(dataURL) {
  getWindow().open(dataURL)
}

/*
Force the browser to download the dataURL as a png image with the name provided
*/
export function downloadImg(dataURL, name = 'chart') {
  const link = document.createElement('a')
  link.download = name
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  link.remove()
}
