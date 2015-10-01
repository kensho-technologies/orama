
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

export default R.mapObjIndexed((display, displayName) => {
  return makeStyleComponentClass(display, displayName)
}, cssDisplayNames)
