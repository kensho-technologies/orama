import {startCase} from 'lodash'
import * as React from 'react'

const context = require.context('./examples', false, /\.js$/)
const examples = context.keys().map(k => {
  const title = startCase(k.replace(/\.js$/, ''))
  const content = context(k).default
  return {title, content}
})

export default function App() {
  return (
    <React.StrictMode>
      <h1>Orama</h1>
      <div className="grid">
        {examples.map(example => (
          <div key={example.title} className="example">
            <h3>{example.title}</h3>
            {example.content}
          </div>
        ))}
      </div>
    </React.StrictMode>
  )
}
