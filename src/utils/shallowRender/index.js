// Copyright 2017 Kensho Technologies, LLC.

const ReactShallowRenderer = require('react-test-renderer/shallow')

export default function shallowRender(element) {
  const renderer = new ReactShallowRenderer();
  renderer.render(element);
  return renderer.getRenderOutput();
}
