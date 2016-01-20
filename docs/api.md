
# API

The components and functions from Orama can be accessed both from the main entry point as directly from its source.  All exports are named exports.

```jsx
import {Chart} from 'orama'
import {Chart} from 'orama/lib/Chart'
```

On the [prototype bundle](quickSetup.md) the components and functions can be accessed from the global export.
```jsx
var Chart = orama.Chart
```
*On the repo the `/src` folder contain the original files, the npm package contain the transpiled version under the `/lib` folder.*


- ['Chart'](#oramalibchart)
- ['Layer'](#oramaliblayer)
- ['utils/dataGeneration'](#oramalibutilsdatageneration)


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

- **children** : `ReactElement`  
The Layer components to be used for rendering the data.
- **width** ?: `number = 500`  
Sets the width of the chart.
- **height** ?: `number`  
Sets the height of the chart.
- **theme** ?: `object = DEFAULT_THEME`  
Sets the aesthetics of the chart, defaults to DEFAULT_THEME located on orama/lib/defaultTheme.
- [\`${dimension}**Name**\`] ?: `string = dimension`  
Sets the name used for the dimension on the axis and tooltip
```jsx
<Chart
  xName='Date'
  yName='Price ($)'
>
```
- [\`${dimension}**ZeroBased**\`] ?: `bool = false`  
If sets to true the domain of *dimension* is extended to contain zero.
- [\`${dimension}**Type**\`] ?: `string`  
Sets the type for *dimension*, instead of automatically extracting it from the data.  
Valid values are: *linear*, *ordinal*, *time*, *log*
- [\`${dimension}**Domain**\`] ?: `Array<string | number>`  
Sets the domain for *dimension*, instead of automatically extracting it from the data.
- [\`${dimension}**Range**\`] ?: `Array<string | number>`  
Sets the range for *dimension*, instead of extracting it from the chart defaults.
- [\`${dimension}**TickSpace**\`] ?: `number`  
Sets the tickSpace for *dimension*, instead of getting it from the defaults.  
- [\`${dimension}**TickCount**\`] ?: `number`  
Sets the tickCount for *dimension*, instead of calculating it from the data.
- [\`${dimension}**TickFormat**\`] ?: `function`  
Sets the tickFormat for *dimension*, instead of extracting it from the chart defaults.
- [\`${dimension}**Ticks**\`] ?: `Array<{value, text}>`  
Sets the tickCount for *dimension*, instead of calculating it from the data.  
*value* is the raw data for the tick.  
*text* is the formatted text for the tick.
- [\`${dimension}**Nice**\`] ?: `bool = false`  
If sets to true extends the domain of *dimension* to nice round values.  
- **margin** ?: `{left, right, top, bottom}`  
Sets the inset margin of the chart, instead of calculating it based on the chart options.
- [\`${dimension}**ShowTicks**\`] ?: `bool = true`  
Show or hide the axis ticks for *dimension*.  
- [\`${dimension}**ShowLabel**\`] ?: `bool = true`  
Show or hide the axis label for *dimension*.  
- [\`${dimension}**TickOffset**\`] ?: `number`  
Sets the axis tickOffset for the *dimension*, instead of calculating it based on the chart options.
- [\`${dimension}**LabelOffset**\`] ?: `number`  
Sets the axis labelOffset for the *dimension*, instead of calculating it based on the chart options.
- [\`${dimension}**backgroundOffset**\`] ?: `number = 15`  
Sets positive offset of plot area.  
- **clipPlot** ?: `bool = true`  
If set to false, it won't clip the plot of the layer to the plotRect bounds. The plotRect is created by insetting the size of the chart by its margins, leaving space to the axis labels and ticks.

## 'orama/lib/Layer'

### `<Points/>`, `<Lines/>`, `<Areas/>`, `<Bars/>`, `<Guides/>`, `<Ranges/>` and `<Text/>`

Layers are used as children of the `<Chart/>` component, they specify the map and marks for rendering the data. Orama comes with a group of default layers, but new ones can be easily created.

**Properties**

- **data** : `Array<Object> | Array<Array<Object>>`  
The input data for the layer. Array of array of objects denote grouped data, for example data to be used on a multi-line chart.
- [**dimension**] : `string`  
Data accessor for a dimension, which can be any dimension recognized by the plot functions and specified on the *accessorNames*.  
Default possible keys are *x*, *x0*, *x1*, *x2*, *y*, *y0*, *y1*, *y2*, *radius*, *fill*, *stroke*, *lineWidth*, *lineDash*, *alpha*, *label*.
- **showHover** ?: `bool = true`  
Turns off the hover behavior.  
- **skipExtractArrays** ?: `bool = false`  
Don't extract values from the data for using in the calculation of types and domains.  
- **Tooltip** ?: `React Component`  
Override the tooltip component.
- **tooltipExtraDimensions** ?: `Array<string>`  
Add extra dimensions to the tooltip, each dimension works as an accessor to the data.
- **tooltipKeys** ?: `Array<string>`  
Sets the keys used for the tooltip, instead of calculating it based on the chart options.
- [\`${dimension}**Label**\`] ?: `string`  
The label *dimension* sets the accessor in the data used to get the title on the tooltip.
- [\`${dimension}**Alias**\`] ?: `string`  
Sets an alias for *dimension* to be used on the tooltip
- [\`${dimension}**TooltipFormat**\`] ?: `function`  
Sets the value formatter for the specified `key`.
- **tooltipShowKeys** : `bool = true`  
Show or hide the keys row on the tooltip.  
- **hoverSolver** : `function`  
Override the hoverSolver function.

## 'orama/lib/utils/dataGeneration'

### getTimeSeries(range, coeff)

- **range :** `Array<number|Date>`
- **coeff ?:** `number = 0.05`
