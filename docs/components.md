# Components 

- [App](#App)
- [BottomLabel](#BottomLabel)
- [CanvasRender](#CanvasRender)
- [Chart](#Chart)
- [ChartBackground](#ChartBackground)
- [ChartInput](#ChartInput)
- [DataList](#DataList)
- [DropCard](#DropCard)
- [Histogram](#Histogram)
- [LeftLabel](#LeftLabel)
- [MapData](#MapData)
- [MapDataCard](#MapDataCard)
- [PropCard](#PropCard)
- [Tooltip](#Tooltip)
- [Vis](#Vis)

### App
[src/components/App/index.js](../src/components/App/index.js)

*Main wrapper for the application*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
children | func | false |  | 


### BottomLabel
[src/components/BottomLabel/index.js](../src/components/BottomLabel/index.js)

*Component that position and style the bottom label of the `Chart` component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
styleVars | object | false |  | 
text | string | false | '' | 


### CanvasRender
[src/components/CanvasRender/index.js](../src/components/CanvasRender/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
renderData | array | false | [] | 
size | object | false | {width: 0, height: 0} | 


### Chart
[src/components/Chart/index.js](../src/components/Chart/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
colorProp | string | false |  | 
data | array | false | [] | 
labelProp | string | false |  | 
margin | object | false | {  left: 80, right: 30,  top: 15, bottom: 60,} | 
size | object | false | {width: 500, height: 400} | 
styleVars | object | false |  | 
title | string | false |  | 
xName | string | false |  | 
xProp | string | false |  | 
yName | string | false |  | 
yProp | string | false |  | 


### ChartBackground
[src/components/ChartBackground/index.js](../src/components/ChartBackground/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
size | object | true |  | 
styleVars | object | false |  | 
xDomain | array | false |  | 
xScale | func | false |  | 
xTickCount | number | false |  | 
xType | string | false |  | 
yDomain | array | false |  | 
yScale | func | false |  | 
yTickCount | number | false |  | 
yType | string | false |  | 


### ChartInput
[src/components/ChartInput/index.js](../src/components/ChartInput/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
renderData | array | false | [] | 
size | object | true |  | 


### DataList
[src/components/DataList/index.js](../src/components/DataList/index.js)

*Component responsible for holdind the data properties to be dragged to the data mapping.
It's used inside of the `Vis` component.*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
styleVars | object | false | {...defaultStyleVars} | 


### DropCard
[src/components/DropCard/index.js](../src/components/DropCard/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
canDrop | bool | false |  | 
connectDropTarget | func | false |  | 
isOver | bool | false |  | 
setText | func | false |  | 
text | string | false |  | 


### Histogram
[src/components/Histogram/index.js](../src/components/Histogram/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
margin | object | false | {  left: 5, right: 5,  top: 5, bottom: 5,} | 
size | object | false | {width: 500, height: 400} | 
styleVars | object | false |  | 
xName | string | false |  | 
xProp | string | false |  | 


### LeftLabel
[src/components/LeftLabel/index.js](../src/components/LeftLabel/index.js)

*Component that position and style the bottom label of the `Chart` component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
styleVars | object | false |  | 
text | string | false | '' | 


### MapData
[src/components/MapData/index.js](../src/components/MapData/index.js)

*Holds the mapping data UI*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
colorProp | string | false |  | 
data | array | false |  | 
groupProp | string | false |  | 
setColorProp | func | false |  | 
setGroupProp | func | false |  | 
setXProp | func | false |  | 
setYProp | func | false |  | 
styleVars | object | false | {...defaultStyleVars} | 
xProp | string | false |  | 
yProp | string | false |  | 


### MapDataCard
[src/components/MapDataCard/index.js](../src/components/MapDataCard/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
data | array | false |  | 
prop | string | false |  | 
styleVars | object | false | {...defaulStyleVars} | 


### PropCard
[src/components/PropCard/index.js](../src/components/PropCard/index.js)

*Component responsible for the draggable cards on list of data properties (DataList)*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
isDragging | bool | false |  | 
styleVars | object | false | {...defaultStyleVars} | 
text | string | false |  | 


### Tooltip
[src/components/Tooltip/index.js](../src/components/Tooltip/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
hoverData | object | false |  | 
mouse | object | false | {} | 
styleVars | object | false | {...defaultStyleVars} | 


### Vis
[src/components/Vis/index.js](../src/components/Vis/index.js)

*Container component for the `DataList` and map data UI.*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
styleVars | object | false |  | 

