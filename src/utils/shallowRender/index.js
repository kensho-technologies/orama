// Copyright 2018 Kensho Technologies, LLC.

import ReactShallowRenderer from 'react-test-renderer/shallow'

export default function shallowRender(element) {
  const renderer = new ReactShallowRenderer();
  renderer.render(element);
  return renderer.getRenderOutput();
}
