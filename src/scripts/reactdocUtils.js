
import R from 'ramda'

/**
 * Get markdown string for all the components.
 * Returns a header, list of links to the components
 * and the components documentation
 * @param  {Object} data - json data from react-docgen
 * @return {string}      markdown string
 */
export default function getComponents(data) {
  var keys = R.sortBy(R.identity, R.keys(data))
  var head = '# Components \n\n'
  var links = R.reduce((acc, key) => {
    var value = data[key]
    return `${acc}- [${value.displayName}](#${value.displayName})\n`
  }, '', keys)
  var components = R.reduce((acc, key) => {
    var value = data[key]
    return (`${acc}
### ${value.displayName}
[${key}](../${key})

*${value.description}*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
${getProps(value.props)}
`)
  }, '', keys)
  return head + links + components
}

/**
 * Create markdown table row from props data object
 * @param  {object} propsData
 * @return {string}           markdown string
 */
export function getProps(propsData) {
  var keys = R.sortBy(R.identity, R.keys(propsData))
  return R.reduce((acc, key) => {
    var prop = propsData[key]
    return (`${acc}${key} | ${getType(prop)} | ${getRequired(prop)} | ${getDefaultValue(prop)} | ${prop.description}\n`)
  }, '', keys)
}

export function getType(prop) {
  if (prop.type) {
    return prop.type.name
  }
  return ''
}

export function getRequired(prop) {
  if (prop.required) {
    return prop.required
  }
  return 'false'
}

export function getDefaultValue(prop) {
  if (prop.defaultValue) {
    return prop.defaultValue.value.replace(/(\r\n|\n|\r)/gm, '')
  }
  return ''
}

export function getDescription(prop) {
  if (prop.description) {
    return prop.description
  }
  return ''
}
