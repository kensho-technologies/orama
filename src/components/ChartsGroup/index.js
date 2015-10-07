import React from 'react'
import R from 'ramda'

import {Flex} from '../Display'
import Chart from '../Chart'

import defaultTheme from '../defaultTheme'

/**
 * Return one or multiple Chart components according to the props
 */
export const getChartElements = ({
  colorProp,
  data,
  groupProp,
  radiusProp,
  theme = defaultTheme,
  xProp,
  yProp,
}) => {
  if (groupProp) {
    const pairs = R.toPairs(R.groupBy(R.prop(groupProp), data))
    return R.map(d => {
      if (d[1].length < 2) return undefined
      if (d[0] === '0') return undefined
      return (
        <Chart
          colorProp={colorProp}
          data={d[1]}
          key={d[0]}
          margin={{left: 70, right: 20, top: 20, bottom: 60}}
          radiusProp={radiusProp}
          size={{width: 300, height: 300}}
          theme={theme}
          title={d[0]}
          xProp={xProp}
          yProp={yProp}
        />
      )
    }, pairs)
  }
  return (
    <Chart
      colorProp={colorProp}
      data={data}
      margin={{left: 210, right: 20, top: 20, bottom: 60}}
      radiusProp={radiusProp}
      size={{width: 700, height: 600}}
      theme={theme}
      xProp={xProp}
      yProp={yProp}
    />
  )
}

/**
 * Render a flex container with the Charts
 */
const ChartsGroup = (props) => (
  <Flex
    flex={1}
    justifyContent={'center'}
    overflow={'scroll'}
  >
    <Flex // elements container
      alignItems='center'
      flexWrap={'wrap'}
      id='vis'
      justifyContent={'center'}
    >
      {getChartElements(props)}
    </Flex>
  </Flex>
)

export default ChartsGroup
