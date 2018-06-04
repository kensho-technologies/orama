import PropTypes from 'prop-types'
import * as React from 'react'

import areas from './examples/areas'
import bars from './examples/bars'
import guides from './examples/guides'
import lines from './examples/lines'
import points from './examples/points'
import ranges from './examples/ranges'
import text from './examples/text'

function Example(props) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.example}
    </section>
  )
}

Example.propTypes = {
  example: PropTypes.node,
  title: PropTypes.string,
}

export default function App() {
  return (
    <React.Fragment>
      <h1>Orama</h1>
      <Example title="Lines" example={lines} />
      <Example title="Points" example={points} />
      <Example title="Areas" example={areas} />
      <Example title="Bars" example={bars} />
      <Example title="Guides" example={guides} />
      <Example title="Ranges" example={ranges} />
      <Example title="Text" example={text} />
    </React.Fragment>
  )
}
