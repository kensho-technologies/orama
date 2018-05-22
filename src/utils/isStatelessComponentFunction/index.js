// Copyright 2018 Kensho Technologies, LLC.

const isStatelessComponentFunction = Component =>
  Component &&
  typeof Component !== 'string' &&
  !(Component.prototype && Component.prototype.render) &&
  !Component.contextTypes

export default isStatelessComponentFunction
