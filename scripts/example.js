
const _ = require('lodash/fp')
const fs = require('fs')

const title = process.argv[2] || 'Example'
const name = _.upperFirst(_.camelCase(title))

const file = `
export const title = '${title}'
export const tags = []
export const hide = false
export const date = new Date('${new Date()}')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines} from '../../../'
import {State} from 'on-update'

export const Component = props =>
  <Chart>
    <Lines
      data={props.fbData}
      x='Date'
      y='Adj. Close'
    />
  </Chart>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
`

fs.mkdirSync(`./src/devApp/examples/${name}/`)
fs.writeFileSync(`./src/devApp/examples/${name}/index.js`, file)

const examples = _.trim(
  fs.readFileSync('./src/devApp/examples/index.js', 'utf8')
)

fs.writeFileSync('./src/devApp/examples/index.js', `
${examples}
export * as ${name} from './${name}'
`)
