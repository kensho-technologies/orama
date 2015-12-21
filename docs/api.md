# API

## `<Chart/>`
`import {Chart} from 'orama/lib/Chart'`

**width:** `number`  
Sets the width of the chart.  
Defaults to `500`.

**height:** `number`  
Sets the height of the chart.  
Defaults to `500`.

**data:** `Array<Object> | Array<Array<Object>>` *required*  
The input data for the Chart. Array of array of objects denote grouped data, for example data to be used on a multi-line chart.

**[key]:** `string` *required*  
Data accessor for a dimension named `key`, which can be any dimension recognized by the plot functions and specified on the `accessorNames`.  
Default possible keys are `x`, `x0`, `x1`, `x2`, `y`, `y0`, `y1`, `y2`, `radius`, `fill`, `stroke`, `lineWidth`, `lineDash`, `alpha`, `label`
```jsx
<Chart
  data={[{p1: 10, p2: 20}]}
  x='p1'
  y='p2'
/>
```

**plot:** `function`  
Defines the plot function to be used to generate the marks.  
Orama come with the following functions: `points`, `lines`, `areas`, `bars`, `guides` and `ranges`. Which can be found at `orama/lib/Chart/plots`.  
Defaults to `points`

**[\`${key}Value\`]:** `string | number`  
Provided value will be used as the mapped value for the specific `key` dimension.
```jsx
<Chart
  data={[{p1: 10, p2: 20}]}
  x='p1'
  fillValue='red'
/>
// Plotted marks will be red
```

**layers:** `Array<Object>`  
Each object from the `layers` work the same way as the root props and generates a new layer on the chart. Before render each layer gets assigned the root props as defaults.
```jsx
<Chart
  data={[{p1: 10}]}
  x='p1'
  y='p2'
  layers={[
    {
      data: [{o1: 100, o2: 200}],
      x: 'o1',
      y: 'o2',
      plot: lines
    }
  ]}
/>
```

**theme:** `object`  
Sets the aesthetics of the chart.

**[\`${key}Name\`]:** `string`  
Sets the name used for the `key` on the axis and tooltip

**[\`${key}ZeroBased\`]:** `bool`  
If sets to true the domain of `key` is extended to contain zero.
Defaults to `false`

**[\`${key}Type\`]:** `string`  
Sets the type for `key`, instead of automatically extracting it from the data.  
Valid values are: `linear`, `ordinal`, `time`, `log`

**[\`${key}Domain\`]:** `Array<string | number>`  
Sets the domain for `key`, instead of automatically extracting it from the data.

**[\`${key}Range\`]:** `Array<string | number>`  
Sets the range for `key`, instead of extracting it from the chart defaults.

**[\`${key}TickSpace\`]:** `number`  
Sets the tickSpace for `key`, instead of getting it from the defaults.  

**[\`${key}TickCount\`]:** `number`  
Sets the tickCount for `key`, instead of calculating it from the data.

**[\`${key}TickFormat\`]:** `function`  
Sets the tickFormat for `key`, instead of extracting it from the chart defaults.

**[\`${key}Ticks\`]:** `Array<{value, text}>`  
Sets the tickCount for `key`, instead of calculating it from the data.  
`value` is the raw data for the tick.  
`text` is the formatted text for the tick.

**[\`${key}Nice\`]:** `bool`  
If sets to true extends the domain of `key` to nice round values.  
Defaults to `false`

**margin:** `{left, right, top, bottom}`  
Sets the inset margin of the chart, instead of calculating it based on the chart options.

**[\`${key}ShowTicks\`]:** `bool`  
Show or hide the axis ticks for `key`.  
Defaults to `true`

**[\`${key}ShowLabel\`]:** `bool`  
Show or hide the axis label for `key`.  
Defaults to `true`

**[\`${key}TickOffset\`]:** `number`  
Sets the axis tickOffset for the `key`, instead of calculating it based on the chart options.

**[\`${key}LabelOffset\`]:** `number`  
Sets the axis labelOffset for the `key`, instead of calculating it based on the chart options.

**[\`${key}backgroundOffset\`]:** `number`  
Sets positive offset of plot area.  
Defaults to `15`

**showHover:** `bool`  
Turns off the hover behavior.  
Defaults to `true`

**skipExtractArrays:** `bool`  
Don't extract values from the data for using in the calculation of types and domains.  
Defaults to `false`

**Tooltip:** `React Component`  
Override the tooltip component.

**tooltipExtraDimensions:** `Array<string>`  
Add extra dimensions to the tooltip, each dimension works as an accessor to the data.

**tooltipKeys:** `Array<string>`  
Sets the keys used for the tooltip, instead of calculating it based on the chart options.

**label:** `string`  
The label `key` sets the accessor in the data used to get the title on the tooltip.

**[\`${key}Alias\`]:** `string`  
Sets an alias for `key` to be used on the tooltip

**[\`${key}TooltipFormat\`]:** `function`  
Sets the value formatter for the specified `key`.

**tooltipShowKeys:** `bool`  
Show or hide the keys row on the tooltip.  
Defaults to `true`

**hoverSolver** `function`  
Override the hoverSolver function.
