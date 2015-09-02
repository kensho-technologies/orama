
import {addons} from 'react/addons'

export default function shallowRender(element) {
  var shallowRenderer = addons.TestUtils.createRenderer()
  shallowRenderer.render(element)
  return shallowRenderer.getRenderOutput()
}
