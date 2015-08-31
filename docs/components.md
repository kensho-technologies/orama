# Components 

- [App](#App)
- [BottomLabel](#BottomLabel)
- [CanvasRender](#CanvasRender)
- [Chart](#Chart)
- [ChartBackground](#ChartBackground)
- [ChartInput](#ChartInput)
- [DataList](#DataList)
- [DropCard](#DropCard)
- [DropUI](#DropUI)
- [LeftLabel](#LeftLabel)
- [PropCard](#PropCard)
- [Vis](#Vis)

### App
[src/components/App/index.js](../src/components/App/index.js)

*App component*

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
xScale | func | false |  | 
xTickCount | number | false |  | 
yScale | func | false |  | 
yTickCount | number | false |  | 


### ChartInput
[src/components/ChartInput/index.js](../src/components/ChartInput/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
renderData | array | false | [] | 
size | object | true |  | 


### DataList
[src/components/DataList/index.js](../src/components/DataList/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 


### DropCard
[src/components/DropCard/index.js](../src/components/DropCard/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
canDrop | bool | false |  | 
connectDropTarget | func | false |  | 
isOver | bool | false |  | 
setText | func | false |  | 
text | string | false |  | 


### DropUI
[src/components/DropUI/index.js](../src/components/DropUI/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
colorProp | string | false |  | 
groupProp | string | false |  | 
setColorProp | func | false |  | 
setGroupProp | func | false |  | 
setXProp | func | false |  | 
setYProp | func | false |  | 
xProp | string | false |  | 
yProp | string | false |  | 


### LeftLabel
[src/components/LeftLabel/index.js](../src/components/LeftLabel/index.js)

*Component that position and style the bottom label of the `Chart` component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
styleVars | object | false |  | 
text | string | false | '' | 


### PropCard
[src/components/PropCard/index.js](../src/components/PropCard/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
isDragging | bool | false |  | 
text | string | false |  | 


### Vis
[src/components/Vis/index.js](../src/components/Vis/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
styleVars | object | false |  | 

