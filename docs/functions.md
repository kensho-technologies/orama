# Modules
- [/utils/dimensionUtils](#/utils/dimensionUtils)
- [/utils/path](#/utils/path)
- [/utils/rectUtils](#/utils/rectUtils)
- [/utils/styleVars](#/utils/styleVars)

## /utils/dimensionUtils

Module for manipulating `dimension` representations

**No functions have been defined on this namespace.**

## /utils/path

Path
Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
This way we can keep running and testing on node code that uses Path2D

### path.DEFAULT()

According to the environments, creates a new `Path2D` object or a `pathMock`.

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | *Path2D,pathMock* | | | 

### path.pathMock()

Creates a pathMock object

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | *Object* | | | 

## /utils/rectUtils

Module for manipulating `Rect` representations

### rectUtils.getMaxX(rectInput)

Get the maximum `x` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | Rect |  |  | 
*Returns* | *number* | | | 

### rectUtils.getMaxY(rectInput)

Get the maximum `y` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | Rect |  |  | 
*Returns* | *number* | | | 

### rectUtils.inset(value, rectInput)

Inset a `Rect` on each side by `value`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
value | number |  |  | 
rectInput | Rect |  |  | 
*Returns* | *Rect* | | | 


```jsx
rectUtils.insetRect(10, {x: 0, y: 0, width: 100, height: 100})
// {x: 10, y: 10, width: 80, height: 80}
```
### rectUtils.marginInset(marginInput, rectInput)

Inset a `Rect | Size` by a margin

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
marginInput | Margin |  |  | {left: number, right: number, top: number, bottom: number}
rectInput | Rect,Size |  |  | 
*Returns* | *Rect* | | | 

## /utils/styleVars

Module for manipulating `Rect` representations

### styleVars.getStyleVars()

Return an object with the current style vars

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
*Returns* | *object* | | | 

### styleVars.setStyleVars(newStyleVars)

Set a new styles vars to be used by the other components

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
newStyleVars | object |  |  | object with new style variables
*Returns* |  | | | 

