
import React, {PropTypes} from 'react'
import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

import {Block} from '@luiscarli/display'
import ChartRenderWrapper from '../ChartRenderWrapper'

/*
Used inside </>
*/
const Chart2 = props => (
  <Block>
    <ChartRenderWrapper
      annotationData={[]}
      highlightData={[]}
      plotRect={{}}
      renderData={[]}
      size={{}}
      theme={props.theme}
    />
  </Block>
)
Chart2.propTypes = {
  data: PropTypes.array,
  layers: PropTypes.array,
  onUpdate: PropTypes.func,
  radius: PropTypes.string,
  theme: PropTypes.object,
  x: PropTypes.string,
  y: PropTypes.string,
}
Chart2.defaultProps = {
  theme: defaultTheme,
}

export default stateHOC(Chart2)
