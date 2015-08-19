# Modules
- [/utils/dimensionUtils](#/utils/dimensionUtils)
- [/utils/rectUtils](#/utils/rectUtils)

## /utils/dimensionUtils

Module for manipulating `dimension` representations

**No functions have been defined on this namespace.**

## /utils/rectUtils

Module for manipulating `Rect` representations

### rectUtils.marginInset(marginInput, rectInput)

Inset a `Rect | Size` by a margin

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
marginInput | Margin |  |  | {left: number, right: number, top: number, bottom: number}
rectInput | Rect,Size |  |  | 
*Returns* | *Rect* | | | **

### rectUtils.inset(value, rectInput)

Inset a `Rect` on each side by `value`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
value | number |  |  | 
rectInput | Rect |  |  | 
*Returns* | *Rect* | | | **


```jsx
rectUtils.insetRect(10, {x: 0, y: 0, width: 100, height: 100})
// {x: 10, y: 10, width: 80, height: 80}
```
### rectUtils.getMaxX(rectInput)

Get the maximum `x` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | Rect |  |  | 
*Returns* | *number* | | | **

### rectUtils.getMaxY(rectInput)

Get the maximum `y` of a `Rect`

Parameter | Type | Default | Optional | Description
--------- | ---- | ------- | -------- | -----------
rectInput | Rect |  |  | 
*Returns* | *number* | | | **

