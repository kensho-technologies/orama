
import {addons} from 'react/addons'

export default function renderComponent(element) {
  var shallowRenderer = addons.TestUtils.createRenderer()
  shallowRenderer.render(element)
  return shallowRenderer.getRenderOutput()
}
