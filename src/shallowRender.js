
import {createRenderer} from 'react-addons-test-utils'

export default function shallowRender(element) {
  var shallowRenderer = createRenderer()
  shallowRenderer.render(element)
  return shallowRenderer.getRenderOutput()
}
