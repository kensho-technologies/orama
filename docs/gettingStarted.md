
## Getting started

```
npm i orama --save
```

> if you don't want to do a npm/webpack/babel setup yet, see the ['Quick setup'](quickSetup.md)

#### Basic example
```jsx
import {Chart} from 'orama/lib/Chart'
import {Lines} from 'orama/lib/Layer'

const MyChart = (props) => (
  <Chart>
    <Lines
      data={props.data}
      x='prop1'
      y='prop2'
    />
  </Chart>
)
```
![Alt text](../dist/imgs/gettingStarted01.png)

##### Chart
The `<Chart/>` component is a wrapper that can contains configurations that affects all his layers. Each children of the `<Chart/>` will be a layer in the resulting plot.

##### Layers
Chart layers need to have at least a `data` and `accessor` properties, the accessors tell what value on the data will be used for each plot dimension.

Orama comes with the following plot layers: `<Points/>`, `<Lines/>`, `<Areas/>`, `<Bars/>`, `<Guides/>`, `<Ranges/>` and `<Texts/>` (new custom plot layers are easy to be created).

##### Data
Orama uses the concept of [tidy data](http://vita.had.co.nz/papers/tidy-data.pdf), in which the data array is an observational unit with each object representing an observation and each property of the object a variable.

The `data` for the layers can be an:
- `array` of `objects`
- `array` of `arrays` of `objects` (grouped data)

The data `objects` should contain only `numbers`, `strings` or `dates`.

Data as an array of arrays is meant to represent grouped data, as for example for multi-lines plots, in which each array will represent a line and each object a point on the line.

##### Dimensions
Each plot layer can respond to a specific set of dimensions, for example the `<Points/>` layer understand the dimensions: `x`, `y`, `radius`, `fill` and `alpha`

The name of the dimension can be suffixed for defining several configurations for the layer or chart, for example:

```jsx
<Chart
  xName='Name on axis'
  xRange={[0, 200]}
  yType='log'
  xFormat={d => `${d}%`}
>
  <Points
    data={props.data}
    x='prop1'
    y='prop2'
    fillValue='red'
  />
</Chart>
```

##### Transformation flow

Before the `<Chart/>` gets rendered there's a series of transformations that happens to generate all the configurations that are not explicit passed to the `<Chart/>` and layers.

First the data for each dimension is extracted from all the layers. From this extracted data the `type`, `domain`, `range`, `scales` and others, are calculated for each dimension.

Each layer get those configurations and use them for mapping their data into render data (data that represents visual marks). Orama uses the render data for plotting the graphs on the screen and to automatically manage all the interaction on those.

#### Other

- [Quick setup](quickSetup.md)
- [API docs](api.md)
