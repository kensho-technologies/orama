# Modules
**[/utils/path](#utilspath)**		
Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
This way we can keep running and testing on node code that uses Path2D

**[/utils/rectUtils](#utilsrectutils)**		
Module for manipulating `Rect` representations

**[/utils/visUtils](#utilsvisutils)**		
Methods for geting type, domain, range, tickCount, scale and others.
Some of the terms used here:

- prop -> string to be used to access the object property
- output -> `string` representing the visual output to be used. Eg: 'x', 'y', 'color', ...
- type -> type of the data dimension: 'linear', 'ordinal', 'time' or 'log'
- domain -> domain of the data according to its type.
- range -> output range of a output, according to the type of the data
- tickCount -> number of ticks that should be shown on a label of a dimension
- scale -> function that map from the domain of the data to the visual range of the output
- ticks -> Array of data to be used for labeling the axis of a dimension
- plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}


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

- prop -> string to be used to access the object property
- output -> `string` representing the visual output to be used. Eg: 'x', 'y', 'color', ...
- type -> type of the data dimension: 'linear', 'ordinal', 'time' or 'log'
- domain -> domain of the data according to its type.
- range -> output range of a output, according to the type of the data
- tickCount -> number of ticks that should be shown on a label of a dimension
- scale -> function that map from the domain of the data to the visual range of the output
- ticks -> Array of data to be used for labeling the axis of a dimension
- plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}

### visUtils.getDomain(data, prop, type)

Return the domain according to the data, prop and type

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
data | `Array.<Object>` |  |  | 
prop | `string` |  |  | 
type | `string` |  | true | 
*Returns* | `Array` | | | 

### visUtils.getMap(prop, scale)

Returns a function that pluck and scale the prop from a data object

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
prop | `string` |  |  | 
scale | `function` |  |  | 
*Returns* | `function` | | | 

### visUtils.getRange(output, plotRect, type)

Return an range Array according output, plotRect and type

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
output | `string` |  |  | 
plotRect | `object` |  |  | 
type | `string` |  | true | 
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

### visUtils.getTickCount(output, range)

Return the number of ticks to be used according to the output and range.
Does not work with ordinal ranges

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
output | `string` |  |  | 
range | `array` |  |  | 
*Returns* | `number` | | | 

### visUtils.getTicks(type, domain, tickCount)

Returns the ticks for label and axis drawing

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
type | `string` |  |  | 
domain | `string` |  |  | 
tickCount | `number` |  | true | 
*Returns* | `array` | | | *Array of 'number' os 'strings', according to the domain of the data*

### visUtils.getType(data, prop)

Return the most predominantly type on a specific property of an array of objects

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
data | `Array.<Object>` |  |  | 
prop | `string` |  |  | 
*Returns* | `string` | | | 

