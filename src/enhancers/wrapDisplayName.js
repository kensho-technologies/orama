function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export default function wrapDisplayName(prefix, Component) {
  return `${prefix}(${getDisplayName(Component)})`
}
