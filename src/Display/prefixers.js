
export function userSelect(style) {
  if (style.hasOwnProperty('userSelect')) {
    return {
      ...style,
      WebkitUserSelect: style.userSelect,
      MozUserSelect: style.userSelect,
      msUserSelect: style.userSelect,
    }
  }
  return style
}

export function transition(style) {
  if (style.hasOwnProperty('transition')) {
    return {
      ...style,
      WebkitTransition: style.transition,
      MozTransition: style.transition,
      msTransition: style.transition,
    }
  }
  return style
}

export function boxShadow(style) {
  if (style.hasOwnProperty('boxShadow')) {
    return {
      ...style,
      WebkitBoxShadow: style.boxShadow,
      MozBoxShadow: style.boxShadow,
      msBoxSelect: style.boxShadow,
    }
  }
  return style
}

export function fontSmoothing(style) {
  if (style.hasOwnProperty('fontSmoothing')) {
    return {
      ...style,
      WebkitFontSmoothing: style.fontSmoothing,
      MozOsxFontSmoothing: style.fontSmoothing === 'antialiased' ? 'grayscale' : undefined,
    }
  }
  return style
}

export function flexDirection(style) {
  if (style.hasOwnProperty('flexDirection')) {
    return {
      ...style,
      WebkitFlexDirection: style.flexDirection,
    }
  }
  return style
}

export function flexWrap(style) {
  if (style.hasOwnProperty('flexWrap')) {
    return {
      ...style,
      WebkitFlexWrap: style.flexWrap,
    }
  }
  return style
}

export function alignItems(style) {
  if (style.hasOwnProperty('alignItems')) {
    return {
      ...style,
      WebkitAlignItems: style.alignItems,
    }
  }
  return style
}

export function flexGrow(style) {
  if (style.hasOwnProperty('flexGrow')) {
    return {
      ...style,
      WebkitFlexGrow: style.flexGrow,
    }
  }
  return style
}

export function flexShrink(style) {
  if (style.hasOwnProperty('flexShrink')) {
    return {
      ...style,
      WebkitFlexShrink: style.flexShrink,
    }
  }
  return style
}

export function order(style) {
  if (style.hasOwnProperty('order')) {
    return {
      ...style,
      WebkitOrder: style.order,
    }
  }
  return style
}

export function justifyContent(style) {
  if (style.hasOwnProperty('justifyContent')) {
    return {
      ...style,
      WebkitJustifyContent: style.justifyContent,
    }
  }
  return style
}

export function flex(style) {
  if (style.hasOwnProperty('flex')) {
    return {
      ...style,
      WebkitFlex: style.flex,
    }
  }
  return style
}

export function displayFlex(style) {
  if (style.display === 'flex') {
    return {
      ...style,
      display: style.display + ';display:-webkit-flex;display:-ms-flexbox',
    }
  }
  return style
}
