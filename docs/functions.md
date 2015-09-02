# Modules
**[/utils/dimensionUtils](#utilsdimensionutils)**		
Module for manipulating `dimension` representations

**[/utils/path](#utilspath)**		
Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
This way we can keep running and testing on node code that uses Path2D

**[/utils/rectUtils](#utilsrectutils)**		
Module for manipulating `Rect` representations

**[/utils/visUtils](#utilsvisutils)**		
Methods for geting type, domain, range, tickCount, scale and others.
Some of the terms used here:

- dimension -> `string` representing the visual dimension to be used. Eg: 'x', 'y', 'color', ...
- plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}
- prop -> string to be used to access the object property
- type -> 'linear', 'ordinal', 'time' or 'log'


---
# [/utils/dimensionUtils](../src/utils/dimensionUtils/index.js)
*[Test spec file](../src/utils/dimensionUtils/index.test.js)*

Module for manipulating `dimension` representations

### dimensionUtils.getColorScale(type, domain)

Returns scales specific for color mapping.
According to type it pre-fills the range of colors

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
type | `string` |  |  | 'linear' or 'ordinal'
domain | `Array` |  |  | the data domain to be used on the scale
*Returns* | `function` | | | *d3 scale function*


```jsx
const colorScale = getColorScale('linear', [0, 100])
colorScale(100) // '#2c7fb8'
```
### dimensionUtils.getRange(key, dimension, rect)

Get default range according to options

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
key | `string` |  |  | dimension name
dimension | `Object` |  |  | 
rect | `Object` |  |  | 
*Returns* | `Array` | | | *range array*

### dimensionUtils.getScaleForDimension(dimension)

Get new scale according to the dimension options

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
dimension | `Object` |  |  | 
*Returns* | `function` | | | *new d3 scale*

### dimensionUtils.getScaleForType(type)

Return a new d3 scale according to the input type

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
type | `string` |  |  | The string needs to be one of the SCALE_TYPES: ['linear', 'log', 'ordinal', 'pow', 'quantile', 'quantize', 'threshold', 'time' ]
*Returns* | `function` | | | *return a new d3 scale*


```jsx
const scale = getScaleForType('linear')

scale.domain([0, 100])
	.range([20, 400])
```
### dimensionUtils.getType(data, prop)

Get the scale type to be used for a dimension on the data.
It access the data objects using the prop, and checks if all the variables are of the same type.

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
data | `Array` |  |  | 
prop | `string` |  |  | 
*Returns* | `string` | | | 

---
# [/utils/path](../src/utils/path/index.js)
*[Test spec file](../src/utils/path/index.test.js)*

Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
This way we can keep running and testing on node code that uses Path2D

### path.DEFAULT()

According to the environments, creates a new `Path2D` object or a `pathMock`.

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | `Path2D,pathMock` | | | 

### path.pathMock()

Creates a pathMock object

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | `Object` | | | 

---
# [/utils/rectUtils](../src/utils/rectUtils/index.js)
*[Test spec file](../src/utils/rectUtils/index.test.js)*

Module for manipulating `Rect` representations

### rectUtils.getMaxX(rectInput)

Get the maximum `x` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | `Rect` |  |  | 
*Returns* | `number` | | | 

### rectUtils.getMaxY(rectInput)

Get the maximum `y` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | `Rect` |  |  | 
*Returns* | `number` | | | 

### rectUtils.inset(value, rectInput)

Inset a `Rect` on each side by `value`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
value | `number` |  |  | 
rectInput | `Rect` |  |  | 
*Returns* | `Rect` | | | 


```jsx
rectUtils.insetRect(10, {x: 0, y: 0, width: 100, height: 100})
// {x: 10, y: 10, width: 80, height: 80}
```
### rectUtils.marginInset(marginInput, rectInput)

Inset a `Rect | Size` by a margin

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
marginInput | `Margin` |  |  | {left: number, right: number, top: number, bottom: number}
rectInput | `Rect,Size` |  |  | 
*Returns* | `Rect` | | | 

---
# [/utils/visUtils](../src/utils/visUtils/index.js)
*[Test spec file](../src/utils/visUtils/index.test.js)*

Methods for geting type, domain, range, tickCount, scale and others.
Some of the terms used here:

- dimension -> `string` representing the visual dimension to be used. Eg: 'x', 'y', 'color', ...
- plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}
- prop -> string to be used to access the object property
- type -> 'linear', 'ordinal', 'time' or 'log'

### visUtils.getDomain(data, prop, type)

Return the domain according to the data, prop and type

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
data | `Array.<Object>` |  |  | 
prop | `string` |  |  | 
type | `string` |  |  | 
*Returns* | `Array` | | | 

### visUtils.getRange(dimension, plotRect, type)

Return an range Array according dimension, plotRect and type

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
dimension | `string` |  |  | 
plotRect | `object` |  |  | 
type | `string` |  |  | 
*Returns* | `Array` | | | 

### visUtils.getScale(type, domain, range, tickCount)

Return a d3 scale configured according to the input parameters

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
type | `string` |  |  | 
domain | `Array` |  |  | 
range | `Array` | [0, 1] | true | 
tickCount | `number` |  |  | 
*Returns* | `function` | | | *d3Scale*

### visUtils.getTickCount(dimension, range)

Return the number of ticks to be used according to the dimension and range.
Does not work with ordinal ranges

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
dimension | `string` |  |  | 
range | `array` |  |  | 
*Returns* | `number` | | | 

### visUtils.getType(data, prop)

Return the most predominantly type on a specific property of an array of objects

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
data | `Array.<Object>` |  |  | 
prop | `string` |  |  | 
*Returns* | `string` | | | 

