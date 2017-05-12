// Copyright 2017 Kensho Technologies, Inc.

const isStatelessComponentFunction = Component => (
  Component &&
  typeof Component !== 'string' &&
  !(Component.prototype && Component.prototype.render) &&
  !Component.contextTypes
)

export default isStatelessComponentFunction
