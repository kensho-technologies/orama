
import defaultsDeep from 'lodash/object/defaultsDeep'

/**
 * Module for manipulating `Rect` representations
 * @namespace  /utils/styleVars
 */

const defaultStyleVars = {
  axis: {
    labelFontSize: 15,
    tickFontSize: 14,
    textAlign: 'center',
    background: 'hsl(0, 0%, 90%)',
  },
}

let _newStyleVars

/**
 * Return an object with the current style vars
 * @memberOf  /utils/styleVars
 *
 * @return {object}
 */
export function getStyleVars() {
  if (_newStyleVars) return _newStyleVars
  return defaultStyleVars
}

/**
 * Set a new styles vars to be used by the other components
 * @memberOf /utils/styleVars
 *
 * @param {object} newStyleVars - object with new style variables
 */
export function setStyleVars(newStyleVars) {
  _newStyleVars = defaultsDeep({}, defaultStyleVars, newStyleVars)
}
