# Components 

- [App](#App)
- [BottomLabel](#BottomLabel)
- [CanvasRender](#CanvasRender)
- [Chart](#Chart)
- [ChartBackground](#ChartBackground)
- [ChartInput](#ChartInput)
- [DataList](#DataList)
- [DownloadImg](#DownloadImg)
- [Histogram](#Histogram)
- [If](#If)
- [LeftLabel](#LeftLabel)
- [MapData](#MapData)
- [MapDataCard](#MapDataCard)
- [PropCard](#PropCard)
- [Tooltip](#Tooltip)
- [Vis](#Vis)

### App
[src/components/App/index.js](../src/components/App/index.js)

Main wrapper for the application

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
children | func | false |  | 


### BottomLabel
[src/components/BottomLabel/index.js](../src/components/BottomLabel/index.js)

Component that position and style the bottom label of the `Chart` component

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
text | string | false | '' | 
theme | object | false | {...defaultTheme} | 


### CanvasRender
[src/components/CanvasRender/index.js](../src/components/CanvasRender/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
renderData | array | false | [] | 
size | object | false | {width: 0, height: 0} | 


### Chart
[src/components/Chart/index.js](../src/components/Chart/index.js)

Main chart component, receives data and name of the properties to be visualized.


```jsx
const data = [{p1: 0.34, p2: 0.693}, {p1: 0.012, p2: 0.123}]
<Chart
	data={data}
	xProp={p1}
	yProp={p2}
>
```


Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
colorProp | string | false |  | 
data | array | false | [] | 
labelProp | string | false |  | 
margin | object | false | {  left: 80, right: 30,  top: 15, bottom: 60,} | 
radiusProp | string | false |  | 
size | object | false | {width: 500, height: 400} | 
styleVars | object | false |  | 
theme | object | false | {...defaultTheme} | 
title | string | false |  | 
xName | string | false |  | 
xProp | string | false |  | 
yName | string | false |  | 
yProp | string | false |  | 


### ChartBackground
[src/components/ChartBackground/index.js](../src/components/ChartBackground/index.js)

Renders background, axis and ticks.
Used inside of Chart components.

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | false |  | 
size | object | true |  | 
theme | object | false | {...defaultTheme} | 
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

Read and executes the inputs from Charts

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
renderData | array | false | [] | 
size | object | true |  | 
theme | object | false |  | 


### DataList
[src/components/DataList/index.js](../src/components/DataList/index.js)

Component responsible for holdind the data properties to be dragged to the data mapping.
It's used inside of the `Vis` component.

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
theme | object | false | {...defaultTheme} | 


### DownloadImg
[src/components/DownloadImg/index.js](../src/components/DownloadImg/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
theme | object | false |  | 


### Histogram
[src/components/Histogram/index.js](../src/components/Histogram/index.js)

Renders a Histogram using the same logic as `Chart`.
This component have not been generalized yet.


```jsx
// Render Schema
<Histogram/>
  <CanvasRender/>
  <ChartInput/>
</Histogram>
```


Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
margin | object | false | {  left: 5, right: 5,  top: 5, bottom: 5,} | 
size | object | false | {width: 500, height: 400} | 
styleVars | object | false |  | 
xName | string | false |  | 
xProp | string | false |  | 
xType | string | false |  | 


### If
[src/components/If/index.js](../src/components/If/index.js)

This component renders or not according to the `condition` prop.


```jsx
// instead of
{condition &&
  <Component/>
}
// you can do
<If condition={condition}>
  <Component/>
</If>
```


Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
children | element | false |  | 
condition | any | false |  | 


### LeftLabel
[src/components/LeftLabel/index.js](../src/components/LeftLabel/index.js)

Component that position and style the bottom label of the `Chart` component

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
plotRect | object | true | {x: 0, y: 0, width: 0, height: 0} | 
text | string | false | '' | 
theme | object | false | {...defaultTheme} | 


### MapData
[src/components/MapData/index.js](../src/components/MapData/index.js)

Holds the mapping data UI

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
chartType | string | false |  | 
colorProp | string | false |  | 
data | array | false |  | 
groupProp | string | false |  | 
radiusProp | string | false |  | 
setProp | func | false |  | 
theme | object | false | {...defaultTheme} | 
xProp | string | false |  | 
yProp | string | false |  | 


### MapDataCard
[src/components/MapDataCard/index.js](../src/components/MapDataCard/index.js)

Drag and Drop card on the mapping data column

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
canDrop | bool | false |  | 
category | string | false |  | 
connectDragSource | func | true |  | 
connectDropTarget | func | true |  | 
data | array | false |  | 
isOver | bool | false |  | 
prop | string | false |  | 
setProp | func | false |  | 
styleVars | object | false | {...defaulStyleVars} | 


### PropCard
[src/components/PropCard/index.js](../src/components/PropCard/index.js)

Component responsible for the draggable cards on list of data properties (DataList)

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
connectDragSource | func | false |  | 
isDragging | bool | false |  | 
prop | string | false |  | 
theme | object | false | {...defaultTheme} | 


### Tooltip
[src/components/Tooltip/index.js](../src/components/Tooltip/index.js)



Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
hoverData | object | false |  | 
mouse | object | false | {} | 
styleVars | object | false |  | 
theme | object | false | {...defaultTheme} | 


### Vis
[src/components/Vis/index.js](../src/components/Vis/index.js)

Container component for the `DataList` and map data UI.

Prop | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
data | array | false | [] | 
theme | object | false |  | 

