
(This library is currently under development)

![Orama js](/dist/imgs/logo.png)[![Build Status](https://travis-ci.org/kensho/orama.svg)](https://travis-ci.org/kensho/orama)

React js data visualization components.  
**Functional API's for going from quick data exploration to custom complex web visualizations.**

- Orama js handles the type extraction, domain calculation from multiple layers, smart interaction and tooltip management across marks, etc. so that you can focus on how you want your data to look.
- Powerful layer abstraction allow for complex layouts to be achieved by manipulating the data before sending it to the chart.
- Aesthetics are fast to be configured trough simple theme objects.
- Smart extension points allow the creation of custom marks, axis and interaction wrapper components (brushes, zooms, annotation, etc). Orama does the heavy lifting, so extensions can focus on functionality.

```
npm i orama --save
```

<img align="right" width="440px" src="dist/imgs/gettingStarted01.png">

```jsx
import {Chart, Lines} from 'orama'

const MyChart = (props) => (
  <Chart>
    <Lines
      data={props.data}
      x='position'
      y='value'
    />
  </Chart>
)
```
**If you don't want to do a npm/webpack/babel setup yet, or if you don't care about React, see the [Quick setup](docs/quickSetup.md)**

### Docs

- [Getting started](/docs/gettingStarted.md)
- [Quick setup](/docs/quickSetup.md)
- [API](/docs/api.md)
- [Contributing](/docs/contributing.md)


*This library is heavily influenced by the work of Mike Bostock, Hadley Wickham, and many other academics and practitioners from the data visualization community.*

> /horáō, "to see, spiritual and mentally" – a vision, focusing on the impact it has on the one beholding the vision.
