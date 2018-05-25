// Copyright 2018 Kensho Technologies, LLC.

export default function isStatelessComponentFunction(Component) {
  return (
    Component &&
    typeof Component !== 'string' &&
    !(Component.prototype && Component.prototype.render) &&
    !Component.contextTypes
  )
}
