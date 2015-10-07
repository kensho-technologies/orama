
import R from 'ramda'

import {makeStyleComponentClass} from './methods'

const cssDisplayNames = {
  Block: 'block',
  Flex: 'flex',
  InlineBlock: 'inline-block',
  Table: 'table',
  TableRow: 'table-row',
  TableCell: 'table-cell',
  Inline: 'inline',
}

/**
 * Exports an object containing a React component for each cssDisplayName
 * The components have a CSS display according to their names and convert their props
 * into autoprefixed CSS styles
 *
 * @example
 * <Block margin={10}/> // <div style="display: block; margin: 10px;"/>
 */
export default R.mapObjIndexed((display, displayName) => {
  return makeStyleComponentClass(display, displayName)
}, cssDisplayNames)
