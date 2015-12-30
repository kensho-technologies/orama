
import {each} from 'lodash'
import {getWindow} from '../windowUtils'

var rasterizeHTML = require('rasterizehtml')

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
      img.setAttribute('width', canvas.getAttribute('width') + 'px')
      img.setAttribute('height', canvas.getAttribute('height') + 'px')
      cloneCanvas.parentNode.replaceChild(img, cloneCanvas)
    }
  )

  const serializer = new XMLSerializer()
  const HTMLString = serializer.serializeToString(cloned)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d');
  canvas.width = width
  canvas.height = height

  return rasterizeHTML
    .drawHTML(HTMLString, canvas)
    .then(renderResult => {
      const image = renderResult.image;
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const src = canvas.toDataURL('image/png');
      canvas.remove();
      return src
    })
    .then(clbck);
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
