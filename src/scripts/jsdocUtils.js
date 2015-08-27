
import R from 'ramda'

export default function getDoc(jsdocData) {
  return R.join('\n', [
    '# Modules',
    getNamespacesNames(jsdocData.namespaces),
    '',
    getNamespaces(jsdocData.namespaces),
  ])
}

export function getNamespacesNames(namespacesData) {
  if (!R.isArrayLike(namespacesData)) return undefined
  return R.join('\n', R.map(genNamespaceNameString, namespacesData))
}

/**
 * Create a markdown link string from a namespace object
 * {
 *   "name": string,
 *   "description": string,
 *   "access": string,
 *   "virtual": bool
 * }
 * @param  {object} d
 * @return {string}
 */
export function genNamespaceNameString(d) {
  return `- [${d.name}](#${d.name.replace(/\//, '')})`
}

function getNamespaces(namespacesData) {
  if (!R.isArrayLike(namespacesData)) return undefined
  return R.join('', R.map(genNamespaceString, namespacesData))
}

function genNamespaceString(d) {
  return `---\n# [${d.name}](../src${d.name})
*[Test spec file](../src${d.name}-test.js)*

${d.description}

${getFunctions(d.functions, R.last(d.name.split('/')) || d.name)}`
}

function getFunctions(functionsData, namespace = '') {
  if (!R.isArrayLike(functionsData)) return '**No functions have been defined on this namespace.**\n\n'
  return R.join('', R.map(
    genFunctionString.bind(this, namespace),
    R.sortBy(R.prop('name'), functionsData)
  ))
}

function genFunctionString(namespace, d) {
  return `### ${namespace}${namespace ? '.' : ''}${d.name}(${getParametersNames(d.parameters)})

${d.description}

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
${getParameters(d.parameters)}*Returns* | ${getReturnsTypeString(d.returns)} | | | ${getReturnsDescriptionString(d.returns)}

${getExamples(d.examples)}`
}

function getReturnsDescriptionString(returns) {
  if (!returns || !returns.description) return ''
  return `*${returns.description}*`
}

function getReturnsTypeString(returns) {
  if (!returns || !returns.type) return ''
  return `*${returns.type}*`
}

function getParametersNames(parametersData) {
  return R.join(', ', R.map(R.path(['name']), parametersData))
}

function getParameters(parametersData) {
  return R.join('', R.map(genParameterString, parametersData))
}

function genParameterString(d) {
  return `${d.name} | ${d.type} | ${d.default} | ${d.optional} | ${d.description}\n`
}

function getExamples(examplesData) {
  return R.join('', R.map(genExamplestring, examplesData))
}

function genExamplestring(d) {
  return `
\`\`\`jsx
${d}
\`\`\`
`
}
