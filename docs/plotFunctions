
## Plot Functions

The plot functions creates `renderData` from the `props` received. The `props` either come directly from the flow of `props` transformation or they are the result of assigning one of the layers back to the root of the `props`.

The `data` from the `props` is mapped into `renderData` by using the scales and accessors defined on the `props`. The main helper for doing the mapping is the `plotValue` function.

The `renderData` is an array of objects that can have the following signature:

```jsx
{
  alpha,
  fillAlpha,
  strokeAlpha,
  path2D, // required
  type, // required, can be 'area', 'line' or 'text'
  fill,
  stroke,
  lineWidth,
  font,
  textAlign,
  textBaseline,
  hoverAlpha,
  hoverFill,
  hoverStroke,
  hoverLineWidth,
  hoverSolver, // function
}
```

Any undefined property gets a default value.

The `hoverSolver` function is responsible for returning the `hoverData` array and the `tooltipData`. For simple cases like the scatterplot, the hoverData can be same as the renderData (when you hover a point only that point gets a hover style). In cases like a line plot, together with the line being hovered, the closest point on the line should also get a hover style.

What gets returned by the hoverSolver is the following object:

```jsx
{
  hoverData,
  tooltipData,
}
```

The tooltipData for the default Tooltip component can be generated using the `extractTooltipData` helper method.
