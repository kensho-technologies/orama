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
[src/components/App.js](../src/components/App.js)

*App component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
children | func | false |  | 


### BottomLabel
[src/components/BottomLabel.js](../src/components/BottomLabel.js)

*Component that position and style the bottom label of the `Chart` component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
text | string | false | '' | 


### CanvasRender
[src/components/CanvasRender.js](../src/components/CanvasRender.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
renderData | array | false | [] | 
size | object | false | {width: 0, height: 0} | 


### Chart
[src/components/Chart.js](../src/components/Chart.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
colorProp | string | false |  | 
data | array | false | [] | 
margin | object | false | {  left: 80, right: 30,  top: 15, bottom: 60,} | 
size | object | false | {width: 500, height: 400} | 
title | string | false |  | 
xName | string | false |  | 
xProp | string | false |  | 
yName | string | false |  | 
yProp | string | false |  | 


### ChartBackground
[src/components/ChartBackground.js](../src/components/ChartBackground.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
size | object | true |  | 
xScale | func | false |  | 
xTickCount | number | false |  | 
yScale | func | false |  | 
yTickCount | number | false |  | 


### ChartInput
[src/components/ChartInput.js](../src/components/ChartInput.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
renderData | array | false | [] | 
size | object | true |  | 


### DataList
[src/components/DataList.js](../src/components/DataList.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 


### DropCard
[src/components/DropCard.js](../src/components/DropCard.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
canDrop | bool | false |  | 
connectDropTarget | func | false |  | 
isOver | bool | false |  | 
setText | func | false |  | 
text | string | false |  | 


### DropUI
[src/components/DropUI.js](../src/components/DropUI.js)



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
[src/components/LeftLabel.js](../src/components/LeftLabel.js)

*Component that position and style the bottom label of the `Chart` component*

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
text | string | false | '' | 


### PropCard
[src/components/PropCard.js](../src/components/PropCard.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
isDragging | bool | false |  | 
text | string | false |  | 


### Vis
[src/components/Vis.js](../src/components/Vis.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 

