import PropTypes from 'prop-types'
import * as React from 'react'

import areas from './examples/areas'
import bars from './examples/bars'
import brush from './examples/brush'
import customTheme from './examples/customTheme'
import functionValues from './examples/functionValues'
import guides from './examples/guides'
import horizontalColoredBars from './examples/horizontalColoredBars'
import hoverEffect from './examples/hoverEffect'
import interpolatedLines from './examples/interpolatedLines'
import lines from './examples/lines'
import linesAndPoints from './examples/linesAndPoints'
import multiYAreas from './examples/multiYAreas'
import points from './examples/points'
import overrideValues from './examples/overrideValues'
import ranges from './examples/ranges'
import text from './examples/text'
import unevenBars from './examples/unevenBars'

function Example(props) {
  return (
    <div className="example">
      <h3>{props.title}</h3>
      {props.content}
    </div>
  )
}

Example.propTypes = {
  content: PropTypes.node,
  title: PropTypes.string,
}

export default function App() {
  return (
    <React.StrictMode>
      <h1>Orama</h1>
      <div className="grid">
        <Example title="Lines" content={lines} />
        <Example title="Interpolated lines" content={interpolatedLines} />
        <Example title="Points" content={points} />
        <Example title="Lines and points" content={linesAndPoints} />
        <Example title="Areas" content={areas} />
        <Example title="Multi-Y areas" content={multiYAreas} />
        <Example title="Bars" content={bars} />
        <Example title="Uneven bars" content={unevenBars} />
        <Example title="Horizontal colored bars" content={horizontalColoredBars} />
        <Example title="Guides" content={guides} />
        <Example title="Ranges" content={ranges} />
        <Example title="Text" content={text} />
        <Example title="Override values" content={overrideValues} />
        <Example title="Function values" content={functionValues} />
        <Example title="Hover effect" content={hoverEffect} />
        <Example title="Custom theme" content={customTheme} />
        <Example title="Brush" content={brush} />
      </div>
    </React.StrictMode>
  )
}
