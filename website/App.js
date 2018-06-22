import {startCase} from 'lodash'
import * as React from 'react'
import PropTypes from 'prop-types'

const context = require.context('./examples', false, /\.js$/)
const examples = context.keys().map(k => {
  const url = k.replace(/\.js$/, '').slice(2)
  const title = startCase(url)
  const content = context(k).default
  return {url, title, content}
})

function getIsolatedExample() {
  return (
    location.hash &&
    location.hash !== '#all' &&
    examples.find(example => example.url === location.hash.slice(1))
  )
}

function Example(props) {
  const {content, title, url} = props
  return (
    <div className="example">
      <h3>
        <a href={`#${url}`}>{title}</a>
      </h3>
      {content}
    </div>
  )
}

Example.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default class App extends React.Component {
  state = {
    singleExample: getIsolatedExample(),
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }

  handleHashChange = () => {
    this.setState({singleExample: getIsolatedExample()})
  }

  render() {
    const {singleExample} = this.state
    return (
      <React.StrictMode>
        <h1>Orama</h1>
        {singleExample && (
          <h3>
            <a href="#all">&larr; All Examples</a>
          </h3>
        )}
        <div className="grid">
          {singleExample ? (
            <Example {...singleExample} />
          ) : (
            examples.map(example => <Example key={example.title} {...example} />)
          )}
        </div>
      </React.StrictMode>
    )
  }
}
