
import _ from 'lodash'
import {addTypes} from '../../Chart/addMethods'

export const getMemoizeAddType = () => {
  let savedResult
  let prevProps = {}
  const memoizeAddType = props => {
    const rerun = _.any(
      props.groupedKeys,
      key => {
        if (props[`${key}Type`] !== prevProps[`${key}Type`]) return true
        if (props[`${key}Array`] !== prevProps[`${key}Array`]) return true
        return false
      }
    )
    prevProps = props
    if (rerun) {
      savedResult = addTypes(props)
    }
    return savedResult
  }
  return memoizeAddType
}
