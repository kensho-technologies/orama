
# API

The API is separated by files, all component and functions from the files are named exports.  

```jsx
import {Chart} from 'orama/lib/Chart'
```

The main file from the package also re-exports most of the files specified here, but we only recommend using it on prototypes.

On the repo the `/src` folder contain the original files, the npm package contain the transpiled version under the `/lib` folder.

- ['Chart'](#orama-lib-chart)
- ['Layer'](#orama-lib-layer)
- ['utils/dataGeneration'](#orama-lib-utils-datageneration)

## 'orama/lib/Chart'

### `<Chart/>`

The `<Chart/>` component can receive configurations for how the plot looks and behaves. Each children of the `<Chart/>` will be a layer in the resulting plot.  
With exception of data and data accessors, all other layer props can be set on `<Chart/>`. They will be used as defaults for the layers.
Layers props can be used on `<Chart/>` (with exception of data and data accessors), when done so they will be used as defaults for all the layers.

```jsx
<Chart
  yType='log'
>
  <Points
    data={props.data}
    x='prop1'
    y='prop2'
  />
</Chart>
```

**Properties**

- **children :** `ReactElement`  
The Layer components to be used for rendering the data.
- **width ?:** `number = 500`  
Sets the width of the chart.
- **height ?:** `number`  
Sets the height of the chart.
- **theme ?:** `object = DEFAULT_THEME`  
Sets the aesthetics of the chart, defaults to DEFAULT_THEME located on orama/lib/defaultTheme.
- **[\`${dimension}Name\`] ?:** `string = dimension`  
Sets the name used for the dimension on the axis and tooltip

## 'orama/lib/Layer'

### `<Points/>`, `<Lines/>`, `<Areas/>`, `<Bars/>`, `<Guides/>`, `<Ranges/>` and `<Texts/>`

**Properties**

- **data:** `Array<Object> | Array<Array<Object>>`  
The input data for the layer. Array of array of objects denote grouped data, for example data to be used on a multi-line chart.

## 'orama/lib/utils/dataGeneration'

### getTimeSeries(range, coeff)

- **range :** `Array<number|Date>`
- **coeff ?:** `number = 0.05`
