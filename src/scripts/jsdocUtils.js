
import R from 'ramda'

export default function getDoc(jsdocData) {
  return R.join('\n', [
    '# Modules',
    getNamespacesNames(jsdocData.namespaces),
    '',
    getNamespaces(jsdocData.namespaces),
  ])
}

function getNamespacesNames(namespacesData) {
  return R.join('\n', R.map(genNamespaceNameString, namespacesData))
}

function genNamespaceNameString(d) {
  return `- [${d.name}](#${d.name})`
}

function getNamespaces(namespacesData) {
  return R.join('', R.map(genNamespaceString, namespacesData))
}

function genNamespaceString(d) {
  return `## ${d.name}

${d.description}

${getFunctions(d.functions, R.last(d.name.split('/')) || d.name)}`
}

function getFunctions(functionsData, namespace = '') {
  return R.join('', R.map(genFunctionString.bind(this, namespace), functionsData))
}

function genFunctionString(namespace, d) {
  return `### ${namespace}${namespace ? '.' : ''}${d.name}(${getParametersNames(d.parameters)})

${d.description}

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
${getParameters(d.parameters)}*Returns* | *${d.returns.type}* | | | *${d.returns.description}*

${getExamples(d.examples)}`
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
